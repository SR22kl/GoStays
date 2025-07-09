import express from "express";
import {
  createRoom,
  getAllRooms,
  getOwnerRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

//Create room:- /api/rooms/
roomRouter.post("/", upload.array("images"), authMiddleware, createRoom);
roomRouter.get("/", getAllRooms);
roomRouter.get("/owner", authMiddleware, getOwnerRooms);
roomRouter.post("/toggle-availability", authMiddleware, toggleRoomAvailability);

export default roomRouter;
