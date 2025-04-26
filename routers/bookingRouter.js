import express from 'express'
import { persist, retrieve, findById} from '../Controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/", persist);

bookingRouter.get("/", retrieve);

bookingRouter.get("/id/:id", findById);

export default bookingRouter;