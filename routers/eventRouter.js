import express from 'express'
import { save } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", save);

export default eventRouter;