import express from 'express'
import { getAll, save } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

reviewRouter.get("/", getAll);

export default reviewRouter;