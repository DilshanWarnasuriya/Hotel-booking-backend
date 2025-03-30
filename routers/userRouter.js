import express from "express";
import { findByContactNo, findById, login, persist, remove, retrieve, update } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.get("/contactNo/:contactNo", findByContactNo);

userRouter.get("/id/:id", findById);

userRouter.put("/", update);

userRouter.delete("/:id", remove);

export default userRouter;