import express from 'express'
import { disable, enable, findByEmail, getAll, remove, save, update } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", save);

reviewRouter.get("/", getAll);

reviewRouter.get("/:email", findByEmail);

reviewRouter.delete("/:id", remove);

reviewRouter.put("/:id", update);

reviewRouter.put("/disable/:id", disable);

reviewRouter.put("/enable/:id", enable);

export default reviewRouter;