import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 SageShelf Archive. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-[#a3b18a]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#a3b18a]">
              Terms
            </a>
            <a href="#" className="hover:text-[#a3b18a]">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
