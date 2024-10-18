import express from 'express'
import { cancel, create, getAll } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", getAll);

bookingRouter.put("/cancel/:id", cancel);

export default bookingRouter;