import cors from "cors";

export const corsOptions = {
  // Explicitly allow your frontend URL (No wildcards!)
  origin: "http://localhost:5173",

  // Allow credentials (cookies, headers, etc.)
  credentials: true,

  // Define allowed methods for the preflight check
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
