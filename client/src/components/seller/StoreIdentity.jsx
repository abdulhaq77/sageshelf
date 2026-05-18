import React, { useState, useRef, useEffect } from "react";
import {
  Store,
  ChevronDown,
  Calendar,
  BookOpen,
  Star,
  ExternalLink,
} from "lucide-react";

export default function StoreIdentity({ storeName = "SageShelf Partner" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click logic managed inside
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
        className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-slate-50 rounded-2xl transition-all select-none"
      >
        <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0 border border-accent/20">
          <Store size={20} />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-black text-slate-900 leading-none">
              {storeName}
            </h2>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
          <p className="text-[9px] font-bold text-success uppercase tracking-widest mt-1">
            Active Store
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-14 left-0 w-60 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-accent" />
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  Joined
                </p>
                <p className="text-xs font-black text-slate-800">May 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen size={16} className="text-accent" />
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  Total Inventory
                </p>
                <p className="text-xs font-black text-slate-800">
                  42 Digital Books
                </p>
              </div>
            </div>
            <hr className="border-slate-50" />
            <a
              href="/preview"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all"
            >
              Live Preview <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
