import express from 'express'
import { disable, enable, findByCategory, findByNumber, getAll, remove, save, update } from '../Controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save);

roomRouter.get("/", getAll);

roomRouter.get("/number/:number", findByNumber);

roomRouter.get("/category/:category", findByCategory);

roomRouter.delete("/:number", remove);

roomRouter.put("/:number", update);

roomRouter.put("/disable/:number", disable);

roomRouter.put("/enable/:number", enable);

export default roomRouter;