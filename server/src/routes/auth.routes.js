import express from "express";
import {
  loginUser,
  registerUser,
  refreshToken,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getProfile);

router.post("/register", registerUser); // register new user

router.post("/login", loginUser); // login user

router.get("/refresh", refreshToken); // refreshing the "access token"

router.post("/logout", logout);

export default router;
