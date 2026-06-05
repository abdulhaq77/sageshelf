import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import LoadingState from "../components/spinners/LoadingState.jsx";

// UI Context Creation
const UIContext = createContext({
  // for bubbke spinner
  globalLoading: {
    isLoading: Boolean,
    message: String,
  },
  setGlobalLoading: () => {},
  showBubbleLoader: () => {},
  hideBubbleLoader: () => {},
});

// Provider Component
export function UIProvider({ children }) {
  // global bubble spinner state
  const [globalLoading, setGlobalLoading] = useState({
    isLoading: false,
    message: "",
  });

  // function for showing bubble spinner
  const showBubbleLoader = (
    message = "Wait while process is being completed...",
  ) =>
    setGlobalLoading({
      isLoading: true,
      message: message,
    });

  // function for hidding bubble spinner
  const hideBubbleLoader = () =>
    setGlobalLoading({
      isLoading: false,
      message: "",
    });

  return (
    <>
      <UIContext.Provider
        value={{
          showBubbleLoader,
          hideBubbleLoader,
        }}
      >
        {children}

        {/* The Universal Overlay: This renders on top of EVERYTHING when active */}
        {globalLoading.isLoading && (
          <div className="fixed inset-0 z-999 bg-white/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
            <LoadingState message={globalLoading.message} />
          </div>
        )}
      </UIContext.Provider>
    </>
  );
}

// exporting the custom hook for easy access to UIContext
// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
  return useContext(UIContext);
}
