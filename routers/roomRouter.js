import express from 'express'
import { getAll, remove, save, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

roomRouter.delete("/:number", remove);

roomRouter.put("/:number", update);

export default roomRouter;