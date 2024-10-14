import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
app.use(bodyParser.json());

//database connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database Connected")).catch(() => console.log("database not connected"));

//JWT authentication middleware 
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(decoded){
                req.user = decoded;
                next();
                console.log(decoded);
            }
            else next();
        })
    } else next();
})

//Routers
app.use("/api/user", userRouter);

app.listen(5000, (req, res) => {
    console.log("Application start in port 5000");
})