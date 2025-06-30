import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Api to listen clerk webhook
app.use("/api/clerk", clerkWebhooks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Api is Working!");
});
