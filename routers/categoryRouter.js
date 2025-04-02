import express from 'express'
import { remove, retrieve, save, update } from '../Controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", save);

categoryRouter.get("/", retrieve);

categoryRouter.delete("/:name", remove);

categoryRouter.put("/:name", update);

export default categoryRouter;