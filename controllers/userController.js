import passwordHash from 'password-hash'
import User from "../Models/user.js";
import jwt from 'jsonwebtoken';

export function persist(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/
    const contactNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }
    if (!contactNoRegex.test(req.body.contactNo)) {
        return res.status(400).json({ message: "Please enter valid contact number" })
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ message: "Please enter more than 8 characters for password" })
    }

    req.body.password = passwordHash.generate(req.body.password); // Password hash

    User.findOne().sort({ id: -1 }) // find last user
        .then((user) => {
            req.body.id = user ? user.id + 1 : 1  // set user id

            const newUser = new User(req.body);
            newUser.save() // save new user
                .then(() => {
                    res.status(201).json({ message: "User Registration Success" })
                })
                .catch((err) => {
                    const errorMessage = err.message;
                    if (errorMessage.includes("email_1")) {
                        res.status(409).json({ message: "Email is already used" })
                    }
                    else if (errorMessage.includes("contactNo_1")) {
                        res.status(409).json({ message: "Contact No is already used" })
                    }
                    else {
                        res.status(500).json({ message: "Server error occurred", error: errorMessage });
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function login(req, res) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/
    const contactNoRegex = /^0\d{9}$/;

    if (!emailRegex.test(req.body.emailOrContactNo) && !contactNoRegex.test(req.body.emailOrContactNo)) {
        return res.status(400).json({ message: "Please enter valid email or contact no." })
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ message: "Please enter valid password" })
    }

    User.findOne({ // find user from email or contact number
        $or: [
            { email: req.body.emailOrContactNo },
            { contactNo: req.body.emailOrContactNo }
        ]
    }).then((user) => {
        if (!user || user.disabled) {
            return res.status(400).json({ message: "User not found" });
        }
        else if (!passwordHash.verify(req.body.password, user.password)) { // check password
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const payload = {
            id: user.id,
            name: user.title + ". " + user.firstName + " " + user.lastName,
            type: user.type,
            image: user.image,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_KEY) // Generate Token

        res.status(200).json({
            message: "Login success",
            userType: user.type, // for identify authorized users
            token: token
        })

    }).catch((err) => {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    })
}

export function retrieve(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }
    const type = req.query.type; // filtering option
    const pageNumber = req.query.pageNo; // page number
    const recordCount = req.query.recordCount; // one page record count
    const skipRecord = (pageNumber - 1) * recordCount; // number of records to skip

    if (type == "Disable") { // disabled filter option
        User.find({ disabled: true }).sort({ id: -1 }).skip(skipRecord).limit(recordCount)
            .then((users) => {
                User.countDocuments({ disabled: true })
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Users found",
                            users: users,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
    else { // admin and user(customer) filter option
        User.find({ type: type, disabled: false }).sort({ id: -1 }).skip(skipRecord).limit(recordCount)
            .then((users) => {
                User.countDocuments({ type: type, disabled: false })
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Users found",
                            users: users,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
}

export function findByContactNo(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }

    User.findOne({ contactNo: req.params.contactNo })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            user.password = "" // password not retrieve
            res.json({
                message: "User found",
                user: user
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        });
}

export function findById(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }

    User.findOne({ id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            user.password = "" // password not retrieve
            res.json({
                message: "User found",
                user: user
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        });
}

export function update(req, res) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactNoRegex = /^0\d{9}$/;

    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: "Please enter valid email address" })
    }
    if (!contactNoRegex.test(req.body.contactNo)) {
        return res.status(400).json({ message: "Please enter valid contact number" })
    }

    if (!req.body.password) {
        delete req.body.password; // Remove password field if empty
    } else {
        req.body.password = passwordHash.generate(req.body.password); // Hash the new password
    }

    // update user data
    User.updateOne({ id: req.body.id }, req.body)
        .then(() => {
            res.status(200).json({ message: "User Update Successful" });
        })
        .catch((err) => {
            const errorMessage = err.message;
            if (errorMessage.includes("email_1")) {
                res.status(409).json({ message: "Email is already used" })
            }
            else if (errorMessage.includes("contactNo_1")) {
                res.status(409).json({ message: "Contact No is already used" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: errorMessage });
            }

        })
}

export function remove(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    User.deleteOne({ id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "User Delete Successful" });
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}


// Check user hear
export function isHaveUser(req) {
    if (req.user) {
        return true;
    }
    return false;
}

// Check admin function
export function isAdmin(req) {
    if (req.user && req.user.type == "admin") {
        return true;
    }
    return false;
}

// Check user(customer) function
export function isUser(req) {
    if (req.user && req.user.type == "user") {
        return true;
    }
    return false;
}

