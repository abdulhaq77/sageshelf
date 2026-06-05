import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, X, CornerDownLeft } from "lucide-react";
import { searchSuggestions } from "../api/endpoints";

export default function SharedSearchBar({
  onSuggestionSelect,
  placeholder = "Search products...",
  autoFocus = false,
  initialValue = "",
}) {
  // Manage the text state internally so typing doesn't re-render the entire navbar
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Sync internal value if initialValue changes from the outside
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(initialValue);
  }, [initialValue]);

  // Debounce mechanism: Listen to local state typing changes
  useEffect(() => {
    const cleanQuery = inputValue?.trim();

    if (!cleanQuery || cleanQuery.length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsAiLoading(true);
      try {
        const response = await searchSuggestions(cleanQuery);

        if (response.data?.success && response.data.keywords?.length > 0) {
          setSuggestions(response.data.keywords);
          setIsDropdownOpen(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Failed syncing AI suggestions matrix:", error);
        setSuggestions([]);
      } finally {
        setIsAiLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  // Close dropdown instantly if user clicks outside of this wrapper container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue?.trim()) {
      onSuggestionSelect(inputValue.trim());
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full z-50 font-sans" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative w-full group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
          <Search size={16} />
        </div>

        <input
          type="text"
          value={inputValue}
          autoFocus={autoFocus}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-900/60 text-slate-100 placeholder-slate-500 text-xs font-semibold px-11 py-3 rounded-xl border border-slate-800 focus:border-emerald-500/50 focus:bg-slate-900 outline-none transition-all focus:shadow-[0_0_20px_rgba(52,211,153,0.06)]"
        />

        <div className="absolute inset-y-0 right-3 flex items-center gap-1.5">
          {isAiLoading ? (
            <div className="w-4 h-4 border-2 border-slate-700 border-t-emerald-400 rounded-full animate-spin" />
          ) : (
            inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("");
                  setSuggestions([]);
                  setIsDropdownOpen(false);
                }}
                className="p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )
          )}
        </div>
      </form>

      {/* DYNAMIC DROPDOWN INTERFACE BOARD */}
      {isDropdownOpen && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-slate-950 border border-slate-900 shadow-2xl rounded-xl overflow-hidden p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono border-b border-slate-900/60 mb-1">
            <Sparkles size={10} className="text-emerald-400 animate-pulse" />
            <span>AI Category Interpretations</span>
          </div>

          <div className="space-y-0.5">
            {suggestions.map((keyword, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  // Direct selection injection: update the field visually AND inform parent router context
                  setInputValue(keyword);
                  onSuggestionSelect(keyword);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-900/80 group/row transition-all duration-150 cursor-pointer"
              >
                <span className="truncate">{keyword}</span>
                <span className="text-[10px] text-slate-600 group-hover/row:text-emerald-400/60 font-mono flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-1 group-hover/row:translate-x-0">
                  Select <CornerDownLeft size={10} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
