import express from 'express'
import { findByEmail, retrieve, remove, update, persist } from '../Controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.get("/email/:email", findByEmail);

reviewRouter.delete("/:id", remove);

reviewRouter.put("/", update);

export default reviewRouter;