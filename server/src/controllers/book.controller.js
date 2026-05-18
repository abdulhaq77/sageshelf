import Book from "../models/Book.model.js";

// upload a new book
export const uploadNewBook = async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      description,
      coverUrl,
      assetUrl,
      sellerId,
    } = req.body;

    if (!coverUrl || !assetUrl) {
      return res.status(400).json({
        message: "Failed to upload cover or asset! Please try again.",
      });
    }

    // Prevent Asset duplication:
    // Check if this exact file (URL) was already listed by this seller
    const existingBook = await Book.findOne({
      $or: [{ assetUrl: assetUrl }, { title: title, sellerId: sellerId }],
    });

    if (existingBook) {
      return res.status(400).json({
        message: "You have already listed a book with this title or file.",
      });
    }

    // if no duplication found, proceed to save the book
    // Save to MongoDB
    const newBook = await Book.create({ ...req.body });
    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      bookData: newBook, // Echo back the mongoDb saved data in order to update the UI
    });
  } catch (error) {
    console.error("Error uploading book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload book",
    });
  }
};
