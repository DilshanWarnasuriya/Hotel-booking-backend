import express from 'express'
import { persist, remove, retrieve, update } from '../Controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

categoryRouter.delete("/:name", remove);

categoryRouter.put("/:name", update);

export default categoryRouter;