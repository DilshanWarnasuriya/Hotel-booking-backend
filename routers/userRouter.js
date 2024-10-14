import express from "express";
import { disable, enable, getAll, login, save, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", save);

userRouter.post("/login", login);

userRouter.get("/", getAll)

userRouter.put("/", update)

userRouter.put("/disable/:email", disable)

userRouter.put("/enable/:email", enable)

export default userRouter;