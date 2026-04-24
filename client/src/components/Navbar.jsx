import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  PlusCircle,
  BookOpen,
  Archive,
  Info,
  Home,
} from "lucide-react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Example state - null = Guest
  const [user, setUser] = useState(null);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Browse",
      path: "/categories",
    },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* --- MOBILE: Store Name / DESKTOP: Logo --- */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-1 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center">
                <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">
                  SAGE<span className="text-[#a3b18a]">SHELF</span>
                </span>
              </Link>
            </div>

            {/* --- DESKTOP ONLY: Nav Links --- */}
            <div className="hidden lg:flex items-center gap-8 ml-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[10px] font-black uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-[#a3b18a]"
                        : "text-slate-500 hover:text-[#a3b18a]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* --- DESKTOP ONLY: Search --- */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search your favourites here ..."
                  className="w-full bg-slate-200 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:bg-slate-200/70 outline-none transition-all"
                />
              </div>
            </div>

            {/* --- RIGHT ACTIONS: Icons for all roles --- */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Toggle (Mobile) */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-[#a3b18a]"
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>

              {/* Sell Icon (Mobile/Desktop) */}
              <Link
                to="/sell"
                className="p-2 text-slate-600 hover:text-[#a3b18a] transition-colors"
                title="Start Selling"
              >
                <PlusCircle className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="text-slate-600 hover:text-[#a3b18a] transition-colors relative p-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-success text-white text-[9px] font-bold px-1.5 rounded-full">
                  0
                </span>
              </Link>

              {/* Profile Icon (Always Visible) */}
              <Link
                to={user ? "/profile" : "/auth"}
                className="p-2 text-slate-600 hover:text-[#a3b18a] transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pb-3 bg-white">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-72 h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-black tracking-tighter">MENU</span>
              <X
                className="w-6 h-6 text-slate-400 cursor-pointer"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#a3b18a]/10 text-[#a3b18a]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-100 pt-6">
              <Link
                to="/auth"
                className="flex items-center justify-center w-full bg-primary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest"
                onClick={() => setIsDrawerOpen(false)}
              >
                Sign In / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
