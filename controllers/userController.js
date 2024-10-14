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
            if(passwordHash.verify(req.body.password, user.password)){ // check password
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
            else res.json({message: "Password is wrong"});
        }
        else res.json({ message: "User not found" });
    }).catch((err) => {
        res.json({
            message: "Logging fail",
            error: err
        })
    })
}