import express from 'express'
import { getAll, remove, save } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", save);

categoryRouter.get("/", getAll);

categoryRouter.delete("/:name", remove)

export default categoryRouter;