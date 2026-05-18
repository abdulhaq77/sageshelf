// components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Heart,
  ShoppingCart,
  BookOpen,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "../context/public/AuthContext.jsx";
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

  // hooks
  const { navigate } = useNavigate();

  // 1. ROLE-BASED GUARD
  // If user is Seller or Admin, we hide this Navbar entirely because they use the Dashboard Layout
  const isManagementRole = user?.role === "seller" || user?.role === "admin";
  const isGuest = user?.role === "guest" || !user;

  // Auto-close overlays on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // 2. BLOCK RENDERING FOR MANAGEMENT ROLES
  // This prevents the Buyer navbar from showing up in the Seller/Admin dashboard areas
  if (isManagementRole) return null;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
    // Only show these to authenticated Buyers
    ...(!isGuest
      ? [
          { name: "My Library", path: "/buyer/my-library" },
          { name: "Orders", path: "/buyer/orders" },
        ]
      : []),
  ];

  console.log("navbar user : ", user);

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

          {/* --- LEFT: Logo & Nav --- */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 shrink-0">
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
            <div className="hidden lg:block w-48 xl:w-64">
              <SharedSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <Search size={20} />
            </button>

            <div className="flex items-center gap-1 border-l pl-3 border-slate-100">
              <Link
                to={isGuest ? "/auth" : "/buyer/wishlist"}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Heart size={20} />
              </Link>
              <button
                onClick={() =>
                  isGuest ? navigate("/auth") : setIsCheckoutOpen(true)
                }
                className="p-2 text-slate-400 hover:text-[#a3b18a] relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-[#a3b18a] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  0
                </span>
              </button>
            </div>

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

      {/* --- DRAWERS --- */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* MOBILE STACK MENU */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Menu
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="p-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 rounded-2xl"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
