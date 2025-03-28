import express from 'express'
import { cancel, confirm, create, findByEmail, findById, getAll } from '../Controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", getAll);

bookingRouter.get("/id/:id", findById);

bookingRouter.get("/email/:email", findByEmail);

bookingRouter.put("/cancel/:id", cancel);

bookingRouter.put("/confirm/:id", confirm);

export default bookingRouter;