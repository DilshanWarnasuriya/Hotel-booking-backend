import express from 'express'
import { create, getAll } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", getAll);

export default bookingRouter;