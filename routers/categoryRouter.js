import express from 'express'
import { getAll, remove, save, update } from '../Controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", save);

categoryRouter.get("/", getAll);

categoryRouter.delete("/:name", remove);

categoryRouter.put("/:name", update);

export default categoryRouter;