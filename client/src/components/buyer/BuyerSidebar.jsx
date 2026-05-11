import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookText,
  Heart,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function BuyerSidebar({ isMobile, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/buyer/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Library",
      path: "/buyer/my-library",
      icon: <BookText size={20} />,
    },
    { name: "Wishlist", path: "/buyer/wishlist", icon: <Heart size={20} /> },
    { name: "Settings", path: "/buyer/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-72 lg:w-64 bg-white border-r border-slate-100 flex flex-col h-full shadow-2xl lg:shadow-none">
      {/* Header Section */}
      <div className="p-6 flex items-center justify-between">
        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
          SAGE<span className="text-[#a3b18a]">SHELF</span>
        </span>

        {/* Close Button - Only visible on mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 lg:hidden rounded-xl hover:bg-slate-50 transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={isMobile ? onClose : undefined} // Close drawer when clicking a link
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-slate-50 text-[#a3b18a] ring-1 ring-slate-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
