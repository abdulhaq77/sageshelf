import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import apiRoutes from "./routes/api.routes.js";
import { corsOptions } from "./config/cors.config.js";
import cookieParser from "cookie-parser";
import { seedAdmin } from "./config/db.seedAdmin.config.js";

// Load environment variables from .env file
dotenv.config();

// App Initialization
const app = express();

// --- Middleware ---
app.use(cors(corsOptions));
app.use(cookieParser()); // For parsing cookies (e.g., refresh token)
app.use(express.json()); // Essential for parsing JSON bodies

// Execute DB Connection
await connectDB();

// Seed Admin User
await seedAdmin();

// --- API Routes ---

// Health Check / Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SageShelf API is running...",
    environment: process.env.NODE_ENV,
  });
});

app.use("/api", apiRoutes);

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
