import React from "react";
import { User, Shield, Languages } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
        Settings
      </h1>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#a3b18a] mb-2">
          <Languages size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Preferences
          </span>
        </div>
        <div className="bg-white p-8 rounded-4xl border border-slate-100 space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Native Language
            </label>
            <select className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 font-bold text-slate-800">
              <option>English</option>
              <option>Punjabi (ਪੰਜਾਬੀ)</option>
              <option>Urdu (اردو)</option>
            </select>
          </div>
          <button className="w-full bg-[#a3b18a] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-opacity-90 transition-all shadow-lg shadow-[#a3b18a]/20">
            Save Preferences
          </button>
        </div>
      </section>
    </div>
  );
}
