import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Leftside Metadata Attribution Badge */}
          <p className="text-slate-500 text-xs font-medium tracking-wide">
            © 2026{" "}
            <span className="text-slate-300 font-bold font-mono">
              SAGE<span className="text-emerald-400/80">SHELF</span>
            </span>{" "}
            Platform. All rights reserved.
          </p>

          {/* Rightside Core Navigation Anchors Group */}
          <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-150 relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-px after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-150 relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-px after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-150 relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-1px after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
