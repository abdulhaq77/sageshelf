import React, { createContext, useState, useContext, useEffect } from "react";
import { getFeaturedBooks } from "../../api/endpoints.js";

// Public books context
const PublicBookContext = createContext({
  fetauredBooks: [],
  setFetauredBooks: () => {},
});

// functions

// Provider component
export const PublicBookProvider = ({ children }) => {
  const [fetauredBooks, setFetauredBooks] = useState([]);
  const [isBooksLoading, setIsBooksLoading] = useState(true);

  //   fetching fetaured books
  useEffect(() => {
    const handleFeaturedCatalog = async () => {
      try {
        // Points to your backend featured books retrieval endpoint
        const response = await getFeaturedBooks();
        console.log("Featured Books API response in context:", response);
        if (response?.success) {
          setFetauredBooks(response.books || []);
        }
      } catch (error) {
        console.error(
          "Failed connecting to featured grid database array:",
          error,
        );
      } finally {
        setIsBooksLoading(false);
      }
    };

    handleFeaturedCatalog();
  }, []);

  return (
    <PublicBookContext.Provider
      value={{ fetauredBooks, setFetauredBooks, isBooksLoading }}
    >
      {children}
    </PublicBookContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePublicBooks = () => useContext(PublicBookContext);
