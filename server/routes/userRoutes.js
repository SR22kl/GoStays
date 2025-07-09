import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getUserData,
  storeRecentSearchedCities,
} from "../controllers/userController.js";

const userRouter = express.Router();

//Get user data:- /api/user/
userRouter.get("/", authMiddleware, getUserData);

//store searched cities data:- /api/user/store-recent-search
userRouter.post(
  "/store-recent-search",
  authMiddleware,
  storeRecentSearchedCities
);

export default userRouter;
