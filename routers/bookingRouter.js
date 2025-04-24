import express from 'express'
import { create, findById, retrieve } from '../Controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

bookingRouter.get("/", retrieve);

bookingRouter.get("/id/:id", findById);

export default bookingRouter;