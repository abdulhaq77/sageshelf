import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Heart, ShoppingCart, BookOpen } from "lucide-react";
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

  const navigate = useNavigate();

  // ROLE-BASED GUARD
  const isManagementRole = user?.role === "seller" || user?.role === "admin";
  const isGuest = user?.role === "guest" || !user;

  // Auto-close overlays on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  if (isManagementRole) return null;

  // ACTION HANDLER: What happens when a user submits a search string or taps an AI keyword dropdown
  const handleSearchExecute = (queryText) => {
    if (!queryText?.trim()) return;

    console.log("navbar search query : ", queryText);

    // Redirects buyer directly to your main shop routing path with query strings appended
    navigate(`/categories?search=${encodeURIComponent(queryText.trim())}`);
    setIsSearchOpen(false); // Close mobile view overlay if active
  };

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
      {/* PREMIUM GLASSMORPHISM NAVIGATION BACKDROP */}
      <nav className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-900 h-20 shadow-xl shadow-slate-950/20">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between relative">
          {/* --- MOBILE SEARCH OVERLAY --- */}
          {isSearchOpen && (
            <div className="absolute inset-0 z-60 bg-slate-950 px-4 flex items-center gap-2 lg:hidden animate-in fade-in slide-in-from-top duration-200 border-b border-slate-900">
              <div className="flex-1">
                {/* Connected Upgraded AI Search Bar for Mobile view screens */}
                <SharedSearchBar
                  onSuggestionSelect={handleSearchExecute}
                  placeholder="Ask AI for books..."
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-800"
              >
                <Menu size={22} />
              </button>

              <Link to="/" className="flex items-center gap-2.5 group">
                {/* Clean Neon SaaS Branding Accent Box */}
                <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-slate-950 hidden sm:flex shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
                  <BookOpen size={16} strokeWidth={2.5} />
                </div>
                <span className="text-base font-black text-white tracking-wider font-mono">
                  SAGE
                  <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    SHELF
                  </span>
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[10px] font-black uppercase tracking-[0.2em] font-mono transition-all duration-150 relative py-1 ${
                      isActive
                        ? "text-emerald-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full"
                        : "text-slate-400 hover:text-slate-200"
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
            {/*  DESKTOP SEARCH BAR ROUTE HOOK */}
            <div className="hidden lg:block w-64 xl:w-80">
              {/* Connected Upgraded AI Search Bar with custom triggers */}
              <SharedSearchBar
                onSuggestionSelect={handleSearchExecute}
                placeholder="Try: 'something sweet and romantic'..."
              />
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Search size={20} />
            </button>

            <div className="flex items-center gap-1 border-l pl-3 border-slate-900">
              <Link
                to={isGuest ? "/auth" : "/buyer/wishlist"}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Heart size={20} />
              </Link>
              <button
                onClick={() =>
                  isGuest ? navigate("/auth") : setIsCheckoutOpen(true)
                }
                className="p-2 text-slate-400 hover:text-emerald-400 relative cursor-pointer"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-emerald-500 text-slate-950 text-[7px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-slate-950 shadow-md">
                  0
                </span>
              </button>
            </div>

            <div className="relative ml-2" ref={profileRef}>
              {isGuest ? (
                <Link
                  to="/auth"
                  className="bg-white hover:bg-slate-100 text-slate-950 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono transition-all shadow-md shadow-white/5 active:scale-[0.98]"
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
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-900 shadow-2xl transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">
                Menu Navigation
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="p-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all font-mono border border-transparent hover:border-slate-900"
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
