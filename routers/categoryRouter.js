import express from 'express'
import { findById, findByName, persist, remove, retrieve, update } from '../Controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

categoryRouter.get("/id/:id", findById);

categoryRouter.get("/name/:name", findByName);

categoryRouter.put("/", update);

categoryRouter.delete("/:id", remove);

export default categoryRouter;