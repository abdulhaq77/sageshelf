import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";

// Load environment variables from .env file
dotenv.config();

// App Initialization
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

// Execute DB Connection
connectDB();

// --- API Routes ---

// Health Check / Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SageShelf API is running...",
    environment: process.env.NODE_ENV,
  });
});

// Placeholder for Vendor/User routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/shops', require('./routes/shopRoutes'));

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- Vercel Export & Local Server Logic ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `Server active in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
}

// Crucial for Vercel Serverless Functions
export default app;
