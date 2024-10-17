import express from 'express'
import { getAll, remove, save } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

reviewRouter.get("/", getAll);

reviewRouter.delete("/:id", remove);

export default reviewRouter;