import cors from "cors";

export const corsOptions = {
  // Explicitly allow your frontend URL (No wildcards!)
  origin: [
    "http://localhost:5173",
    "https://sageshelf.vercel.app",
    "https://sageshelf-7mwzv6r3b-abdulhaq77s-projects.vercel.app",
  ],

  // Allow credentials (cookies, headers, etc.)
  credentials: true,

  // Define allowed methods for the preflight check
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
