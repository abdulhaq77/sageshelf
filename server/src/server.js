const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

// --- Database Connection ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit the process in production (Vercel), just log it
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

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
module.exports = app;
