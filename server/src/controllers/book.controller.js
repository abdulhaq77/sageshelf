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

    console.log("book uploading by seller : ", req.body);

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

    console.log("existing book found : ", existingBook);

    if (existingBook) {
      return res.status(400).json({
        message: "You have already listed a book with this title or file.",
      });
    }

    // if no duplication found, proceed to save the book
    // Save to MongoDB
    const newBook = await new Book({ ...req.body });
    await newBook.save();

    console.log("new book created for upload by seller : ", newBook);

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

// get searched books
export const fetchSearchedBooks = async (req, res) => {
  try {
    console.log("search query : ", req.query);
    // 1. Destructure the query parameters arriving from the frontend URL state
    const { category, price, rating, search, sort, page, limit } = req.query;

    // Initialize an empty dynamic query condition map
    let queryFilter = {};

    // 2. CATEGORY MATCH LAYER
    if (category && category !== "all") {
      queryFilter.category = category;
    }

    // 3. SEARCH MATRIX INTERCEPTION LAYER ($or Regular Expression)
    if (search) {
      const searchRegex = new RegExp(search.trim(), "i"); // 'i' enforces case-insensitivity
      queryFilter.$or = [
        { title: searchRegex },
        { author: searchRegex },
        { description: searchRegex },
      ];
    }

    // 4. PRICE RANGE BOUNDARY CALCULATOR
    if (price && price !== "all") {
      if (price === "under-15") {
        queryFilter.price = { $lt: 15 };
      } else if (price === "15-30") {
        queryFilter.price = { $gte: 15, $lte: 30 };
      } else if (price === "over-30") {
        queryFilter.price = { $gt: 30 };
      }
    }

    // 5. QUALITY RATING THRESHOLD LAYER
    if (rating && rating !== "all") {
      const numericRating = parseFloat(rating);
      if (!isNaN(numericRating)) {
        queryFilter.rating = { $gte: numericRating };
      }
    }

    // 6. SORT PIPELINE CONDITIONAL ASSIGNMENT
    let sortOptions = {};
    switch (sort) {
      case "price-low":
        sortOptions.price = 1; // Ascending order
        break;
      case "price-high":
        sortOptions.price = -1; // Descending order
        break;
      case "rating":
        sortOptions.rating = -1; // Top-rated priority order
        break;
      case "newest":
      default:
        sortOptions.createdAt = -1; // Default fallback to newest additions
        break;
    }

    // 7. PAGINATION AND LIMITATION ARCHITECTURE CALCULATOR
    const activePage = Math.max(parseInt(page, 10) || 1, 1);
    const activeLimit = Math.max(parseInt(limit, 10) || 8, 1);
    const skipValue = (activePage - 1) * activeLimit;

    // 8. PARALLELIZED DATABASE EXECUTION PROMISE LOOP (Highly optimized)
    const [books, totalItems] = await Promise.all([
      Book.find(queryFilter)
        .sort(sortOptions)
        .skip(skipValue)
        .limit(activeLimit)
        .lean(), // Converts Mongoose Documents to plain objects for faster serialization
      Book.countDocuments(queryFilter),
    ]);

    console.log("books : ", books);

    // 9. RETURN SANITIZED STANDARDIZED DATA OBJECT
    return res.status(200).json({
      success: true,
      books,
      totalItems,
      currentPage: activePage,
      totalPages: Math.ceil(totalItems / activeLimit),
    });
  } catch (error) {
    console.error("Database compilation pipeline matrix crash:", error);
    return res.status(500).json({
      success: false,
      message: "Internal framework processing error.",
      error: error.message,
    });
  }
};

// get featured Books for homepage
export const getFeaturedBooks = async (req, res) => {
  console.log("fetching featured books for homepage");
  try {
    // Look specifically for the flag, sort by newest, and restrict to 4 items
    const featuredBooks = await Book.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    // 💡 Fallback Strategy: If an admin forgets to mark items as featured,
    // don't leave the homepage blank! Pull the top-rated books instead.
    if (featuredBooks.length === 0) {
      const fallbackBooks = await Book.find()
        .sort({ rating: -1, salesCount: -1 })
        .limit(4)
        .lean();

      return res.status(200).json({
        success: true,
        books: fallbackBooks,
        fallback: true,
      });
    }

    return res.status(200).json({
      success: true,
      books: featuredBooks,
      fallback: false,
    });
  } catch (error) {
    console.error("Featured collection fetch crash:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error compiling dashboard grid." });
  }
};
