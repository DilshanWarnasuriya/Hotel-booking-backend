import express from 'express'
import { disable, enable, getAll, save, update } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", save);

eventRouter.get("/", getAll)

eventRouter.put("/:name", update)

eventRouter.put("/disable/:name", disable)

eventRouter.put("/enable/:name", enable)

export default eventRouter;