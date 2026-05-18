import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/public/AuthContext";
import SellerSidebar from "../components/seller/SellerSidebar";
import SellerHeader from "../components/seller/SellerHeader";
import InventoryProvider from "../context/seller/InventoryContext";
import { useRouteLoaderData } from "react-router-dom";

export default function SellerLayout() {
  // states
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  // loaders data
  const inventoryData = useRouteLoaderData("seller-wrapper");

  return (
    <InventoryProvider initialInventoryData={inventoryData}>
      <div className="flex h-screen bg-primary overflow-hidden font-sans">
        <SellerSidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
          logout={logout}
        />

        <div className="flex-1 flex flex-col min-w-0 bg-white lg:rounded-l-[2.5rem] shadow-2xl overflow-hidden relative">
          <SellerHeader
            onMenuClick={() => setIsMobileOpen(true)}
            user={user}
            logout={logout}
          />

          <main className="flex-1 overflow-y-auto bg-background p-6 md:p-10 custom-scrollbar">
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </div>
    </InventoryProvider>
  );
}
