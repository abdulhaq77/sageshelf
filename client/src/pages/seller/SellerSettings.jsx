import React, { useState } from "react";
import {
  User,
  Store,
  Bell,
  ShieldCheck,
  CreditCard,
  Camera,
  Save,
  Globe,
} from "lucide-react";

export default function SellerSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "store", label: "Store", icon: <Store size={18} /> },
    { id: "billing", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "security", label: "Security", icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage your account preferences and store identity
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- LEFT: NAVIGATION TABS --- */}
        <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "bg-white text-accent shadow-sm border border-slate-100"
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </aside>

        {/* --- RIGHT: CONTENT AREA --- */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          {/* TAB CONTENT: PROFILE */}
          {activeTab === "profile" && (
            <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Avatar Upload */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Seller+Admin&background=0D8ABC&color=fff&size=128"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <Camera size={18} />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Alex Hamilton"
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 focus:ring-accent/20 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="alex.dev@example.com"
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 focus:ring-accent/20 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Bio / Professional Headline
                    </label>
                    <textarea
                      rows="3"
                      defaultValue="Senior Fullstack Developer & Technical Author specializing in React and Node.js."
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: STORE */}
          {activeTab === "store" && (
            <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    defaultValue="The Dev Library"
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Custom Store URL
                  </label>
                  <div className="flex items-center bg-slate-50 rounded-2xl px-5 py-3.5">
                    <Globe size={16} className="text-slate-300 mr-2" />
                    <span className="text-sm text-slate-400 font-bold">
                      sageshelf.com/
                    </span>
                    <input
                      type="text"
                      defaultValue="dev-library"
                      className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 outline-none p-0 ml-1"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10">
                <div className="flex gap-4">
                  <ShieldCheck className="text-accent shrink-0" size={24} />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      Pro Seller Status
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Your store is verified. You can list unlimited digital
                      products and receive 95% of every sale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- FOOTER: SAVE BUTTON --- */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              Discard Changes
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 cursor-pointer">
              <Save size={16} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
