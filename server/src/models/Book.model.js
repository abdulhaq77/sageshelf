import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      index: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    coverImage: {
      type: String, // URL to Cloudinary/S3
      required: true,
    },
    // Digital Asset Specifics
    fileUrl: {
      type: String, // Secure link to the full digital file
      required: true,
      select: false, // Prevents sending the download link in general API searches
    },
    previewUrl: {
      type: String, // Link to a free sample or first few pages
    },
    format: {
      type: String,
      enum: ["PDF", "EPUB", "MOBI", "Multiple"],
      default: "PDF",
    },
    fileSize: {
      type: String, // e.g., "12MB"
    },
    // Metrics
    isFeatured: {
      type: Boolean,
      default: false,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Index for search performance
bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;
