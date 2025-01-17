import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userRouter from "./routers/userRouter.js";
import eventRouter from "./routers/eventRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import roomRouter from "./routers/roomRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import bookingRouter from "./routers/bookingRouter.js";

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
            if (decoded) {
                req.user = decoded;
                next();
            }
            else next();
        })
    } else next();
})

//Routers
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/category", categoryRouter);
app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);

app.listen(5000, (req, res) => {
    console.log("Application start in port 5000");
})