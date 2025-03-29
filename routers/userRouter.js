import express from "express";
import { findByContactNo, login, persist, retrieve, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/contactNo/:contactNo", findByContactNo);

userRouter.put("/", update);

export default userRouter;