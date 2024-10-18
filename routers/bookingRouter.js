import express from 'express'
import { create } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", create);

export default bookingRouter;