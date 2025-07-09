import express from "express";
import {
  checkAvailabilityApi,
  createBooking,
  getHotelBookingsDetails,
  getUserBookings,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

//Check Room availbility :- /api/bookings/check-availability
bookingRouter.post("/check-availability", checkAvailabilityApi);

//Create a new booking:- /api/bookings/book
bookingRouter.post("/book", authMiddleware, createBooking);

//Get all users booking:- /api/bookings/user
bookingRouter.get("/user", authMiddleware, getUserBookings);

//Get all hotel bookings dashboard data:- /api/bookings/hotel
bookingRouter.get("/hotel", authMiddleware, getHotelBookingsDetails);

export default bookingRouter;
