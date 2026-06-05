import express from "express";
import { uploadNewBook } from "../controllers/book.controller.js";
import { getSellerInventory } from "../controllers/sellerInventory.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload/new-book",
  verifyToken,
  authorizeRoles("seller"),
  uploadNewBook,
); // upload new book
router.get(
  "/inventory",
  verifyToken,
  authorizeRoles("seller"),
  getSellerInventory,
); // get seller inventory

export default router;
