import React from "react";
import { Search, X } from "lucide-react";

export default function SharedSearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search digital assets...",
  className = "",
}) {
  return (
    <div className={`relative w-full group ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#a3b18a] text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-300/50 border-transparent rounded-2xl py-3 pl-11 pr-10 text-sm font-medium focus:bg-slate-300/70 focus:border-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a]/5 outline-none transition-all border"
      />

      {/* Clear Button (X) - Only shows if there is text */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-600 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
