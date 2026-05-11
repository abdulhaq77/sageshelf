import express from "express";
import {
  loginUser,
  registerUser,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser); // register new user

router.post("/login", loginUser); // login user

router.get("/refresh", refreshToken); // refreshing the "access token"

router.post("/logout", logout);

export default router;
