import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SellerSidebar from "../components/seller/SellerSidebar";

export default function SellerLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Side Navigation (Fixed/Responsive) */}
      <SellerSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/*Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
