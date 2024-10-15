import express from 'express'
import { getAll, save } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", save)

categoryRouter.get("/", getAll)

export default categoryRouter;