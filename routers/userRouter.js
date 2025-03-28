import express from "express";
import { disable, enable, findByEmail, findByPhoneNo, retrieve, login, save, update } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", save);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/phoneNo/:phoneNo", findByPhoneNo);

userRouter.get("/email/:email", findByEmail);

userRouter.put("/", update);

userRouter.put("/disable/:email", disable);

userRouter.put("/enable/:email", enable);

export default userRouter;