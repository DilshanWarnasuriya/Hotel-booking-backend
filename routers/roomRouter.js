import express from 'express'
import { save } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", save)

export default roomRouter;