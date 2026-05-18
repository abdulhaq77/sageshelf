// components/seller/SellerSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Store,
  ChevronRight,
} from "lucide-react";

export default function SellerSidebar({ isMobileOpen, onCloseMobile, logout }) {
  const menuLinks = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Manage Books",
      path: "/seller/inventory",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Analytics",
      path: "/seller/analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      name: "Settings",
      path: "/seller/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside
      className={`
        /* 1. Core Dimensions & Theme */
        w-64 min-w-[16rem] h-full bg-primary text-white flex flex-col shrink-0 z-50
        
        /* 2. Mobile Behavior: Hidden by default, slides in from left */
        fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        
        /* 3. Desktop Behavior: Stays in the flex row */
        lg:static lg:translate-x-0
      `}
    >
      {/* Sidebar Top: Branding */}
      <div className="h-20 flex items-center gap-3 px-6 shrink-0 border-b border-white/10">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Store className="text-white" size={20} />
        </div>
        <span className="font-black tracking-tighter uppercase italic text-lg">
          SAGE<span className="text-accent">SHELF</span>
        </span>
      </div>

      {/* Navigation: Scrollable Middle Section */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
          Control Panel
        </p>

        {menuLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={onCloseMobile}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {link.icon}
              {link.name}
            </div>
            <ChevronRight
              size={14}
              className={`transition-opacity ${link.isActive ? "opacity-100" : "opacity-0"}`}
            />
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Bottom: User Actions */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-danger hover:bg-danger/10 transition-all cursor-pointer"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
