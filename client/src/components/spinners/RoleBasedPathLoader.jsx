import React from "react";

// /**
//  * @param {string} message - The text displayed under the animation
//  * @param {React.ElementType} Icon - The Lucide icon component to render
//  */

// eslint-disable-next-line no-unused-vars
export default function RoleBasedPathLoader({ message, Icon }) {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/40 backdrop-blur-2xl animate-in fade-in duration-700">
      <div className="flex flex-col items-center">
        {/* SaaS BENTO-TILE ANIMATION */}
        <div className="relative mb-10 w-16 h-16">
          <div className="grid grid-cols-2 gap-1.5 w-full h-full">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-full bg-slate-950 rounded-lg shadow-sm animate-pulse"
                style={{
                  animationDelay: `${i * 150}ms`,
                  opacity: 0.1 + i * 0.15,
                }}
              />
            ))}
          </div>

          {/* DYNAMIC ICON SLOTS */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* The Container: Increased padding for a larger feel while keeping dimensions in sync */}
            <div className="relative bg-white p-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100/80 animate-bounce transition-all duration-1000 group">
              {/* Subtle Premium Glow behind the icon */}
              <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl group-hover:bg-indigo-500/20 transition-colors" />

              <Icon
                size={32} // Increased size as requested
                strokeWidth={2.2} // Slightly thinner stroke for a "high-end" look at larger sizes
                className="relative z-10 text-indigo-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
              />

              {/* Background Accent (replaces bg-accent with a cleaner premium touch) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r  from-transparent via-indigo-500/20 to-transparent rounded-full" />
            </div>
          </div>

          {/* DYNAMIC TEXT SECTION */}
          <div className="w-full space-y-4 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 ml-1">
                {message}
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                Secure Protocol Active
              </p>
            </div>

            {/* Minimal Progress Line */}
            <div className="w-48 h-[1.5px] bg-slate-100 rounded-full overflow-hidden mx-auto relative">
              <div className="absolute inset-0 bg-slate-900 w-1/3 animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
