import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content Area */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
