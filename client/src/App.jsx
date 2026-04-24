import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
