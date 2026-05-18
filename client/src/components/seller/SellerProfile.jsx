import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Shield, CreditCard, LogOut } from "lucide-react";

export default function SellerProfile({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "S";

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="text-right hidden md:block">
          <p className="text-sm font-black text-slate-900 leading-none">
            {user?.name || "Seller"}
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
            Account Settings
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm group-hover:ring-accent transition-all relative">
          {user?.avatar ? (
            <img
              src={user.avatar}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            initials
          )}
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-white shadow-sm" />
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform hidden sm:block ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-14 right-0 w-64 bg-white rounded-4xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-5 bg-slate-50/50 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Email ID
            </p>
            <p className="text-xs font-bold text-slate-800 truncate">
              {user?.email || "seller@sageshelf.com"}
            </p>
          </div>
          <div className="p-3 space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <User size={16} className="text-slate-400" /> My Profile
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <CreditCard size={16} className="text-slate-400" /> Payout History
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-danger hover:bg-danger/5 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
          <div className="p-4 bg-accent/5 mx-3 mb-3 rounded-2xl border border-accent/10 flex items-center gap-2">
            <Shield size={14} className="text-accent" />
            <span className="text-[10px] font-black text-accent uppercase">
              Tier 1 Verified
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
