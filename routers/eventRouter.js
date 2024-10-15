import express from 'express'
import { getAll, save } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", save);

eventRouter.get("/", getAll)

export default eventRouter;