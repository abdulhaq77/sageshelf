// components/common/LoadingState.jsx
import React from "react";

export default function LoadingState({ message }) {
  return (
    <div className="flex min-h-75 w-full flex-col items-center justify-center p-6 transition-all">
      {/* Horizontal Hubbles (Bubbles) */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-3 w-3 rounded-full bg-accent animate-bubble-bounce delay-300" />
        <div className="h-3 w-3 rounded-full bg-accent/60 animate-bubble-bounce delay-150" />
        <div className="h-3 w-3 rounded-full bg-accent/30 animate-bubble-bounce" />
      </div>

      {/* Message & Sliding Line */}
      <div className="relative flex flex-col items-center max-w-xs w-full">
        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase pb-3 text-center">
          {message}
        </p>

        {/* Track */}
        <div className="h-0.5 w-32 bg-slate-200 overflow-hidden rounded-full">
          {/* Animated Slider */}
          <div className="h-full bg-accent w-1/3 rounded-full animate-progress-slide" />
        </div>
      </div>
    </div>
  );
}
