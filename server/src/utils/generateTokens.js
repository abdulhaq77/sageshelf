import jwt from "jsonwebtoken";

// Utility functions to generate JWT tokens for authentication
export const generateAccessToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

// Utility function to generate refresh token
export const generateRefreshToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
