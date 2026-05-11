import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// auth routes
router.use("/auth", authRoutes);

// seller routes
// router.use("/seller", require("./seller.routes"));

// user routes
// router.use("/user", require("./user.routes"));

// asset/product routes
// router.use("/assets", require("./asset.routes"));

export default router;
