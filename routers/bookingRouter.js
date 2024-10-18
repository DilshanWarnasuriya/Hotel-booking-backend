import express from 'express'
import { cancel, confirm, create, getAll } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", getAll);

bookingRouter.put("/cancel/:id", cancel);

bookingRouter.put("/confirm/:id", confirm);

export default bookingRouter;