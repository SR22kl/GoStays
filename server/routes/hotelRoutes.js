import express from "express";
import { registerHotel } from "../controllers/hotelController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const hotelRouter = express.Router();

//Register hotel:- /api/hotels/register
hotelRouter.post("/register", authMiddleware, registerHotel);

export default hotelRouter;
