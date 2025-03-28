import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import eventRouter from "./Routers/eventRouter.js";
import categoryRouter from "./Routers/categoryRouter.js";
import roomRouter from "./Routers/roomRouter.js";
import reviewRouter from "./Routers/reviewRouter.js";
import bookingRouter from "./Routers/bookingRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(authenticate);

//database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connection success")).catch(() => console.log("Database connection fail"));

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