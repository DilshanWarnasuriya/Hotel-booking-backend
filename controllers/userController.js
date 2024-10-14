import passwordHash from 'password-hash'
import User from "../models/user.js";


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