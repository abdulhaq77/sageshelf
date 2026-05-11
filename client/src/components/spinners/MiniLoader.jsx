import React from "react";

export default function MiniLoader({ message = "", size = "md" }) {
  // Mapping sizes for flexibility
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 w-full h-full min-h-25">
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`${sizeClasses[size]} border-slate-100 rounded-full animate-pulse`}
        ></div>

        {/* Spinning Accent Ring */}
        <div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-t-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
        ></div>
      </div>

      {message && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
