import express from 'express'
import { disable, enable, getAll, remove, save, update } from '../Controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", save);

eventRouter.get("/", getAll)

eventRouter.put("/:name", update)

eventRouter.put("/disable/:name", disable)

eventRouter.put("/enable/:name", enable)

eventRouter.delete("/:name", remove)

export default eventRouter;