import express from "express";
import { save } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", save)

export default userRouter;