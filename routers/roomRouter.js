import express from 'express'
import { findByNumber, persist, remove, retrieve, update } from '../Controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/", retrieve);

roomRouter.get("/number/:number", findByNumber);

roomRouter.put("/", update);

roomRouter.delete("/:number", remove);

export default roomRouter;