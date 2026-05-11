import React from "react";
import {
  LayoutDashboard,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileIcon({
  user,
  isSeller,
  logout,
  isProfileOpen,
  setIsProfileOpen,
}) {
  return (
    <>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 group"
      >
        <div className="hidden sm:flex flex-col items-end leading-none">
          <span className="text-[10px] font-bold text-slate-900">
            {user.name}
          </span>
          <span className="text-[7px] font-black uppercase text-[#a3b18a] tracking-widest">
            {user.role} Account
          </span>
        </div>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:border-[#a3b18a] transition-all">
          <User size={18} />
        </div>
        <ChevronDown
          size={14}
          className={`text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-12 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-70 animate-in zoom-in-95 duration-150">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-[10px] font-bold text-slate-900 truncate">
              {user.name}
            </p>
            <p className="text-[7px] font-black text-[#a3b18a] uppercase tracking-widest">
              {user.role} Mode
            </p>
          </div>

          {isSeller ? (
            <Link
              to="/seller/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:text-[#a3b18a]"
            >
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          ) : (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:text-[#a3b18a]"
            >
              <User size={14} /> My Profile
            </Link>
          )}

          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:text-[#a3b18a]"
          >
            <Settings size={14} /> Settings
          </Link>

          <hr className="my-2 border-slate-50" />
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-red-400 hover:bg-red-100 flex items-center gap-2"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      )}
    </>
  );
}
