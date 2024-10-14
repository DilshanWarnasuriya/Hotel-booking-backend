import express from "express";
import { getAll, login, save } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", save);

userRouter.post("/login", login);

userRouter.get("/", getAll)

export default userRouter;