import express from 'express'
import { cancel, confirm, create, findById, getAll } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", getAll);

bookingRouter.get("/id/:id", findById);

bookingRouter.put("/cancel/:id", cancel);

bookingRouter.put("/confirm/:id", confirm);

export default bookingRouter;