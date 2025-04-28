import express from 'express'
import { persist, retrieve, findById, findByContactNo } from '../Controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", persist);

bookingRouter.get("/", retrieve);

bookingRouter.get("/contactNo", findByContactNo);

bookingRouter.get("/id/:id", findById);

export default bookingRouter;