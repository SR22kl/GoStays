import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Api to listen clerk webhook
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("Api is Working!");
});

//Api Routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
