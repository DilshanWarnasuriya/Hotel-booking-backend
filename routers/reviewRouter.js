import express from 'express'
import { findByEmail, retrieve, remove, save, update } from '../Controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

reviewRouter.get("/", retrieve);

reviewRouter.get("/:email", findByEmail);

reviewRouter.delete("/:id", remove);

reviewRouter.put("/", update);

export default reviewRouter;