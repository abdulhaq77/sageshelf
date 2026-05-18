// seller
// Book Uploads, Personal Earnings, and "My Listed Books."

import React, { useState } from "react";
import { createContext, useContext } from "react";

// Inventory Context
const InventoryContext = createContext({
  addBookToInventory: () => {},
  removeBookFromInventory: () => {},
});

export default function InventoryProvider({ children, initialInventoryData }) {
  // states
  const [booksInventory, setBooksInventory] = useState(
    initialInventoryData || [],
  );

  //   functions
  const addBookToInventory = (book) => {
    setBooksInventory((prevBooks) => [...prevBooks, book]);
  };

  const removeBookFromInventory = (bookId) => {
    setBooksInventory((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookId),
    );
  };

  return (
    <>
      <InventoryContext.Provider
        value={{ booksInventory, addBookToInventory, removeBookFromInventory }}
      >
        {children}
      </InventoryContext.Provider>
    </>
  );
}

// Custom hook for easy access to InventoryContext
// eslint-disable-next-line react-refresh/only-export-components
export function useInventory() {
  return useContext(InventoryContext);
}
