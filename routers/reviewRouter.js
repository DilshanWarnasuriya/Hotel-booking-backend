import express from 'express'
import { save } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

export default reviewRouter;