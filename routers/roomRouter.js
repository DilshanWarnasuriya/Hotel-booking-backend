import express from 'express'
import { getAll, remove, save } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

roomRouter.delete("/:number", remove);

export default roomRouter;