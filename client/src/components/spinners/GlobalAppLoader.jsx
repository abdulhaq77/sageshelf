import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

export default function GlobalAppLoader() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md">
      {/* Icon Container */}
      <div className="relative flex items-center justify-center">
        {/* Animated Dashed Ring - using animate-spin with a slow duration */}
        <div className="absolute h-20 w-20 animate-[spin_4s_linear_infinite] rounded-full border-2 border-dashed border-[#a3b18a]/40" />

        {/* Core Shield - Pulse effect to show 'activity' */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a3b18a] text-white shadow-xl shadow-[#a3b18a]/20 animate-pulse">
          <ShieldCheck size={28} strokeWidth={2.5} />
        </div>

        {/* Small Lock Badge */}
        <div className="absolute -top-1 -right-1 h-5 w-5 animate-bounce rounded-full bg-slate-900 flex items-center justify-center ring-2 ring-white">
          <Lock size={10} className="text-white" />
        </div>
      </div>

      {/* Text Context */}
      <div className="mt-10 text-center px-6">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-900 italic">
          SAGE<span className="text-[#a3b18a]">SHELF</span>
        </h2>

        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Verifying Identity & Session
          </p>

          {/* Scanning Track - Pure Tailwind Animation */}
          <div className="relative h-[2px] w-40 overflow-hidden bg-slate-100 rounded-full">
            <div className="absolute inset-0 h-full w-1/2 bg-[#a3b18a] animate-[slide_1.5s_ease-in-out_infinite] shadow-[0_0_10px_#a3b18a]" />
          </div>
        </div>
      </div>

      {/* Footer Branding for Buyers */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
          Secure Digital Environment
        </span>
        <div className="flex gap-1">
          <div className="h-1 w-1 rounded-full bg-[#a3b18a]" />
          <div className="h-1 w-1 rounded-full bg-slate-200" />
          <div className="h-1 w-1 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
