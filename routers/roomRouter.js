import express from 'express'
import { disable, enable, findByNumber, getAll, remove, save, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

roomRouter.get("/number/:number", findByNumber);

roomRouter.delete("/:number", remove);

roomRouter.put("/:number", update);

roomRouter.put("/disable/:number", disable);

roomRouter.put("/enable/:number", enable);

export default roomRouter;