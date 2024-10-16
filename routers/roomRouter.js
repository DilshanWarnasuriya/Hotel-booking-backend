import express from 'express'
import { disable, enable, getAll, remove, save, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

roomRouter.delete("/:number", remove);

roomRouter.put("/:number", update);

roomRouter.put("/disable/:number", disable);

roomRouter.put("/enable/:number", enable);

export default roomRouter;