import express from 'express'
import {findByCategory, findByNumber, persist, remove, retrieve, update } from '../Controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/", retrieve);

roomRouter.get("/number/:number", findByNumber);

roomRouter.get("/category/:category", findByCategory);

roomRouter.delete("/:number", remove);

roomRouter.put("/:number", update);

export default roomRouter;