import express from "express";
import authRoutes from "./auth.routes.js";
import sellerRoutes from "./seller.routes.js";
import searchRoutes from "../routes/search.routes.js";
import booksRoutes from "../routes/books.routes.js";

const router = express.Router();

// auth routes
router.use("/auth", authRoutes);

// seller routes
router.use("/seller", sellerRoutes);

// search routes
router.use("/search", searchRoutes);

// product routes
router.use("/get", booksRoutes);

export default router;
