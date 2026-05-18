import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import StoreIdentity from "./StoreIdentity";
import SellerProfile from "./SellerProfile";

export default function SellerHeader({ onMenuClick, user, logout }) {
  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 shrink-0 border-b border-slate-100 bg-white/80 backdrop-blur-md lg:rounded-tl-[2.5rem] sticky top-0 z-40">
      {/* LEFT: Mobile Menu & Store Brand */}
      <div className="flex items-center gap-4">
        {/* Only visible on mobile/tablet */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu size={22} />
        </button>

        <StoreIdentity storeName={user?.storeName} />
      </div>

      {/* RIGHT: Notifications & Profile */}
      <div className="flex items-center gap-2 md:gap-5">
        {/* Notification Bell */}
        <button className="relative p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group">
          <Bell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        {/* Separator for desktop */}
        <div className="hidden sm:block h-8 w-px bg-slate-100 mx-1"></div>

        <SellerProfile user={user} logout={logout} />
      </div>
    </header>
  );
}
