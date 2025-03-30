import express from "express";
import { findByContactNo, findById, login, persist, retrieve, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/contactNo/:contactNo", findByContactNo);

userRouter.get("/id/:id", findById);

userRouter.put("/", update);

export default userRouter;