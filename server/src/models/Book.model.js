import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coverUrl: {
      type: String,
      required: [true, "Cover URL is required"],
    },
    assetUrl: {
      type: String,
      required: [true, "Asset URL is required"],
      unique: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Index for search performance
bookSchema.index({ title: "text", description: "text" });

// Create a compound unique index to prevent duplicate book uploads for the same seller
bookSchema.index({ title: 1, sellerId: 1 }, { unique: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;
