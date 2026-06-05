import Book from "../models/Book.model.js";

// get All inventory of a particular seller
export const getSellerInventory = async (req, res) => {
  try {
    // 1. Authenticated Seller Verification
    const sellerId = req.user._id || req.user.id;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Vendor profile missing.",
      });
    }

    // Isolate data scope purely to this vendor
    const query = { sellerId: sellerId };

    // 2. Extract Server-Side Pagination Arguments from Frontend Request
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // 3. High-Speed Concurrent Database Queries via Promise.all
    const [rawInventory, totalItems] = await Promise.all([
      Book.find(query)
        .sort({ createdAt: -1 }) // Newest books show up first on dashboard
        .skip(skip)
        .limit(limit)
        .lean(), // ⚡ LEAN OPTIMIZATION: Returns plain JS objects instead of heavy Mongoose documents
      Book.countDocuments(query),
    ]);

    // 4. Cloudinary Delivery Optimization Layer
    // We dynamically transform cover URLs to match the exact dimension bounding boxes of your UI table rows.
    const optimizedInventory = rawInventory.map((book) => {
      let optimizedCoverUrl = book.coverUrl;

      // Check if it's a valid Cloudinary URL before running transformations
      if (
        optimizedCoverUrl &&
        optimizedCoverUrl.includes("res.cloudinary.com")
      ) {
        // Enforce secure HTTPS delivery and apply dynamic transforms:
        // q_auto: automated smart compression | f_auto: delivers modern formats like WebP or AVIF
        // w_150,h_200,c_fill: pre-crops and shrinks asset bytes to fit dashboard list thumbnails perfectly
        optimizedCoverUrl = optimizedCoverUrl
          .replace("http://", "https://")
          .replace(
            "/upload/",
            "/upload/c_fill,g_auto,w_150,h_200,q_auto,f_auto/",
          );
      }

      return {
        ...book,
        coverUrl: optimizedCoverUrl,
      };
    });

    // 5. Structure Unified Server Response Payload
    return res.status(200).json({
      success: true,
      count: optimizedInventory.length,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
      inventory: optimizedInventory, // Feeds directly into your frontend useSeller context array
    });
  } catch (error) {
    console.error(
      "❌ Error in getSellerInventory Cloudinary Controller:",
      error,
    );
    return res.status(500).json({
      success: false,
      message: "Server error encountered while parsing inventory payload.",
      error: error.message,
    });
  }
};

// Update book status of seller
export const updateBookStatus = async (req, res) => {
  try {
    const sellerId = req.user._id || req.user.id;
    const { status } = req.body;

    if (!["Active", "Draft"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status profile provided." });
    }

    // Isolate by book ID AND matching seller validation parameter
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id, sellerId: sellerId },
      { status: status },
      { new: true, runValidators: true },
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Listing not found or access unauthorized.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Listing status updated to ${status} successfully.`,
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// permanently delete book liating from inventory of a seller
export const deleteBookListing = async (req, res) => {
  try {
    const sellerId = req.user._id || req.user.id;

    // Isolate by book ID AND matching seller verification rule
    const deletedBook = await Book.findOneAndDelete({
      _id: req.params.id,
      sellerId: sellerId,
    });

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Listing not found or access unauthorized.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listing permanently dropped out of stock arrays.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
