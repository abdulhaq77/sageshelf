import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Heart,
  ShoppingCart,
  BookOpen,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SharedSearchBar from "./SharedSearchBar";
import ProfileIcon from "./ProfileIcon.jsx";
import CheckoutDrawer from "../components/buyer/CheckoutDrawer.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const profileRef = useRef(null);

  // UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic: Guest vs Authenticated Buyer
  const isGuest = user.role === "guest" ? true : false;

  // Auto-close overlays on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
    ...(!isGuest
      ? [
          { name: "My Library", path: "/buyer/my-library" },
          { name: "Orders", path: "/buyer/orders" },
        ]
      : []),
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 h-20">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between relative">
          {/* --- MOBILE SEARCH OVERLAY --- */}
          {isSearchOpen && (
            <div className="absolute inset-0 z-60 bg-white px-4 flex items-center gap-2 lg:hidden animate-in fade-in slide-in-from-top duration-200">
              <div className="flex-1">
                <SharedSearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery("")}
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* --- LEFT: Logo & Desktop Navigation --- */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 shrink-0">
              {/* Stack Menu Toggle (Mobile) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Menu size={22} />
              </button>

              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#a3b18a] rounded-lg flex items-center justify-center text-white hidden sm:flex">
                  <BookOpen size={18} />
                </div>
                <span className="text-base font-black text-slate-900 tracking-tighter uppercase italic">
                  SAGE<span className="text-[#a3b18a]">SHELF</span>
                </span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? "text-[#a3b18a]"
                        : "text-slate-400 hover:text-slate-900"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Actions --- */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Search */}
            <div className="hidden lg:block w-48 xl:w-64">
              <SharedSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <Search size={20} />
            </button>

            {/* Interaction Group */}
            <div className="flex items-center gap-1 border-l pl-3 border-slate-100">
              <Link
                to={isGuest ? "/auth" : "/buyer/wishlist"}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Heart size={20} />
              </Link>
              <Link
                to={isGuest ? "/auth" : "/buyer/cart"}
                onClick={() => setIsCheckoutOpen(true)}
                className="p-2 text-slate-400 hover:text-[#a3b18a] relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-[#a3b18a] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  0
                </span>
              </Link>
            </div>

            {/* AUTH SECTION: Join vs Profile */}
            <div className="relative ml-2" ref={profileRef}>
              {isGuest ? (
                <Link
                  to="/auth"
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                >
                  Join
                </Link>
              ) : (
                <ProfileIcon
                  user={user}
                  logout={logout}
                  setIsProfileOpen={setIsProfileOpen}
                  isProfileOpen={isProfileOpen}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- DRAWERS & MODALS --- */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* MOBILE STACK MENU (Slide-out Navigation) */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Navigation
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-50 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      isActive
                        ? "bg-[#a3b18a]/10 text-[#a3b18a]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Footer / Auth Call to Action in Menu */}
            {isGuest && (
              <div className="p-6 mt-auto">
                <Link
                  to="/auth"
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  <UserIcon size={14} />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
