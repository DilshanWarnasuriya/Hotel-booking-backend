import express from 'express'
import { getAll, save } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

export default roomRouter;