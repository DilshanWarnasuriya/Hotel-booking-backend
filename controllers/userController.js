import passwordHash from 'password-hash'
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export function save(req, res) {
    req.body.password = passwordHash.generate(req.body.password); // password hashing
    const newUser = new User(req.body);
    newUser.save().then((result) => {
        res.json({
            message: "User registration success",
            user: result
        })
    }).catch((err) => {
        res.json({
            message: "User registration fail",
            error: err
        })
    });
}

export function login(req, res) {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user || !user.disabled) {
            if (passwordHash.verify(req.body.password, user.password)) { // check password
                const payload = {
                    email: user.email,
                    password: user.password,
                    type: user.type
                }
                const token = jwt.sign(payload, process.env.JWT_KEY) // generate token
                res.json({
                    message: "Login success",
                    token: token
                })
            }
            else res.json({ message: "Password is wrong" });
        }
        else res.json({ message: "User not found" });
    }).catch((err) => {
        res.json({
            message: "Logging fail",
            error: err
        })
    })
}

export function getAll(req, res) {
    if (isAdmin(req)) {
        User.find().then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json({
                message: "Server error",
                error: err
            });
        });
    }
    else res.json({ message: "not permission" });
}

export function findByPhoneNo(req, res) {
    if (isAdmin(req)) {
        User.findOne({ phoneNo: req.params.phoneNo }).then((user) => {
            res.json(user)
        }).catch((err) => {
            res.json({ message: "Server error" });
        });
    } else res.json({ message: "not permission" });
}

export function findByEmail(req, res) {
    if (isAdmin(req)) {
        User.findOne({ email: req.params.email }).then((user) => {
            res.json(user)
        }).catch((err) => {
            res.json({ message: "Server error" });
        });
    } else res.json({ message: "not permission" });
}

export function update(req, res) {
    if (isHaveUser(req)) {
        User.updateOne({ email: req.body.email }, req.body).then((result) => {
            res.json({ message: "User update success" })
        }).catch((err) => {
            res.json({
                message: "User update fail",
                user: err
            })
        });
    }
}

export function disable(req, res) {
    if (isAdmin(req)) {
        User.updateOne({ email: req.params.email }, { disabled: true }).then((result) => {
            res.json({ message: "User disable success" })
        }).catch((err) => {
            res.json({ message: "User disable fail" })
        });
    }
}

export function enable(req, res) {
    if (isAdmin(req)) {
        User.updateOne({ email: req.params.email }, { disabled: false }).then((result) => {
            res.json({ message: "User enable success" })
        }).catch((err) => {
            res.json({ message: "User enable fail" })
        });
    }
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

