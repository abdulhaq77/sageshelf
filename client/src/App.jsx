import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import GlobalAppLoader from "./components/spinners/GlobalAppLoader.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<GlobalAppLoader />} />
      <ToastContainer position="bottom-right" />
    </>
  );
}
