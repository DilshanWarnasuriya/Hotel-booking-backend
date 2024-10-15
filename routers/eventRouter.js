import express from 'express'
import { disable, enable, getAll, save } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", save);

eventRouter.get("/", getAll)

eventRouter.put("/disable/:name", disable)

eventRouter.put("/enable/:name", enable)

export default eventRouter;