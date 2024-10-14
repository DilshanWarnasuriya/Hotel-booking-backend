import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(bodyParser.json())


app.listen(5000, (req, res) => {
    console.log("Application start in port 5000");
})