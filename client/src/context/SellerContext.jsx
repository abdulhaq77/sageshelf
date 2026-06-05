import React, { createContext, useContext, useState } from "react";
import {
  deleteSellerListing,
  updateSellerInventory,
  uploadAsset,
} from "../api/endpoints.js";
import { useNavigate } from "react-router-dom"; // ⚡ Note: Changed from useNavigation to useNavigate for programmatic routing
import { toast } from "react-toastify";
import { getSellerInventory } from "../api/endpoints.js";

// Book Context
const SellerContext = createContext({
  books: [],
  totalItems: 0,
  setBooks: () => {},
  handleBookUpload: () => {},
  handleFetchSellerInventory: () => {},
});

// book provider component
export function SellerProvider({ children }) {
  // states
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Tracking absolute database
  // counts for paginated views

  // hooks
  const navigate = useNavigate();

  // FUNCTIONS

  // Upload a new book
  const handleBookUpload = async (bookData) => {
    try {
      console.log("handle book upload called ....");
      const bookInfoData = await uploadAsset(bookData);

      console.log("book context response data ? : ", bookInfoData);
      if (bookInfoData.success) {
        setBooks((prev) => [...prev, bookInfoData.bookData]);

        // navigate to inventory dashboard page
        navigate("/seller/inventory");
        toast.success(bookInfoData.message || "Asset uploaded successfully!");
      }
    } catch (error) {
      console.error("❌ Failed to upload asset:", error);
      toast.error(error.response?.data?.message || "Asset upload failed.");
    }
  };

  // update a listing
  const handleUpdateBookStatus = async (bookId, currentStatus) => {
    try {
      const targetStatus = currentStatus === "Active" ? "Draft" : "Active";
      // Replace with your real endpoints axios signature
      const res = await updateSellerInventory(bookId, { status: targetStatus });

      if (res.data.success) {
        // Inline status mutation updates state dynamically for smooth UX
        setBooks((prev) =>
          prev.map((b) =>
            b._id === bookId ? { ...b, status: targetStatus } : b,
          ),
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to alter document state.");
    }
  };

  // delete listing
  const handleDeleteBookListing = async (bookId) => {
    try {
      const res = await deleteSellerListing(bookId);
      if (res.data.success) {
        // Removes element from view state immediately
        setBooks((prev) => prev.filter((b) => b._id !== bookId));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to drop database node listing.");
    }
  };

  // Get segmented paginated page blocks of inventory data rows for a specific seller
  const handleFetchSellerInventory = async (page = 1, limit = 10) => {
    try {
      // Optional Optimization: If we already have books matching our count, we can bypass
      // But since pagination fetches specific chunks, we check if page data needs fresh sync
      const inventoryResponse = await getSellerInventory(page, limit);
      if (inventoryResponse?.data?.success) {
        setBooks(inventoryResponse.data.inventory);
        setTotalItems(inventoryResponse.data.pagination.totalItems);
      }
    } catch (err) {
      console.error("❌ Failed to fetch inventory page chunk:", err);
    }
  };

  return (
    <SellerContext.Provider
      value={{
        books,
        totalItems,
        currentPage,
        setCurrentPage,
        setBooks,
        handleBookUpload,
        handleFetchSellerInventory,
        handleUpdateBookStatus,
        handleDeleteBookListing,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

// Custom hook to extract context values cleanly inside views
// eslint-disable-next-line react-refresh/only-export-components
export function useSeller() {
  return useContext(SellerContext);
}
