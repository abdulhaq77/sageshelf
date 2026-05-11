import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

export default function SellerSidebar({ isMobileOpen, onCloseMobile }) {
  const sellerMenu = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Listings",
      path: "/seller/listings",
      icon: <Package size={20} />,
    },
    {
      name: "Sales Orders",
      path: "/seller/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Add New Book",
      path: "/seller/add",
      icon: <PlusCircle size={20} />,
    },
  ];

  return (
    <>
      {/* --- Mobile Overlay --- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* --- Sidebar Container --- */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50
        h-screen w-64 bg-white border-r border-slate-100
        flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Brand & Mobile Close */}
        <div className="p-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            SAGE<span className="text-[#a3b18a]">SELLER</span>
          </span>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sellerMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                ${
                  isActive
                    ? "bg-[#a3b18a] text-white shadow-lg shadow-[#a3b18a]/20"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <NavLink
            to="/settings"
            className="flex items-center gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
          >
            <Settings size={20} />
            Settings
          </NavLink>
          <button className="flex items-center gap-4 px-4 py-3 w-full text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 rounded-2xl transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
