import express from "express";
import { disable, getAll, login, save, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", save);

userRouter.post("/login", login);

userRouter.get("/", getAll)

userRouter.put("/", update)

userRouter.put("/:email", disable)

export default userRouter;