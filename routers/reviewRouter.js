import express from 'express'
import { findByEmail, getAll, remove, save } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

reviewRouter.get("/", getAll);

reviewRouter.get("/:email", findByEmail);

reviewRouter.delete("/:id", remove);

export default reviewRouter;