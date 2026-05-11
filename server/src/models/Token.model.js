import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    index: true, // Speeds up the logout/refresh search
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60, // 7 days in seconds
  },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
