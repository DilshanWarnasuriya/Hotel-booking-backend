import express from 'express'
import { save } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", save)

export default categoryRouter;