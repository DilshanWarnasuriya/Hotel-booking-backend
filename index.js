import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

//database connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database Connected")).catch(() => console.log("database not connected"));

//Routers
app.use("/api/user", userRouter);

app.listen(5000, (req, res) => {
    console.log("Application start in port 5000");
})