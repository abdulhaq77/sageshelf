import mongoose from "mongoose";

// Database Connection configuration
export const connectDB = async () => {
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
