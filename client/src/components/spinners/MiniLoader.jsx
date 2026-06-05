import React from "react";
import { Loader2 } from "lucide-react";

export default function MiniLoader({
  message,
  subMessage,
  minHeight = "min-h-[250px]",
}) {
  return (
    /* @container turns this div into a context anchor. 
       All '@' prefixes below change size based on the PARENT element, not the screen size! */
    <div
      className={`w-full @container flex flex-col items-center justify-center p-4 @xs:p-6 @md:p-10 ${minHeight} text-center animate-in fade-in zoom-in-95 duration-300`}
    >
      {/* Premium SaaS Loader Core */}
      <div className="relative flex items-center justify-center mb-3 @xs:mb-4">
        {/* Modern ambient glow backdrop */}
        <div className="absolute w-12 h-12 bg-slate-100/80 rounded-full blur-xl animate-pulse" />

        {/* Track Ring */}
        <div className="absolute w-10 h-10 border-[3px] border-slate-100/80 rounded-full" />

        {/* High-contrast Active Spinner */}
        <Loader2
          size={36}
          className="text-slate-900 animate-spin relative z-10 stroke-[2.25] @xs:size-10"
        />
      </div>

      {/* Micro-Typography Text Stack */}
      <div className="space-y-1 max-w-xs @xs:max-w-md px-2">
        <h4 className="text-[10px] @xs:text-[11px] @md:text-xs font-black uppercase tracking-[0.2em] text-slate-800 antialiased">
          {message}
        </h4>
        {subMessage && (
          <p className="text-[9px] @xs:text-[10px] @md:text-[11px] font-medium text-slate-400/80 tracking-normal">
            {subMessage}
          </p>
        )}
      </div>
    </div>
  );
}
