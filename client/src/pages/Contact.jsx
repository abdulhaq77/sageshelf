import React from "react";
import { Mail, MapPin, Send, Sparkles, Layers } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* --- LEFT SIDE: PREMIUM TELEMETRY DETAILS --- */}
          <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-28">
            {/* SaaS Micro-Badge */}
            <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full">
              <Sparkles size={10} className="text-emerald-500 animate-pulse" />
              <span className="text-slate-500 font-black text-[9px] tracking-[0.25em] uppercase font-mono">
                Support Matrix
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
              Contact the <br />
              <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Archive
              </span>
              .
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-sm">
              Have system architectural questions, catalog listing validation
              needs, or licensing requirements? Open a direct communication log
              below.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              {/* Email Element Block */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all group">
                <div className="p-3 bg-slate-950 text-emerald-400 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-slate-400 text-[9px] uppercase tracking-wider font-mono">
                    System Comms
                  </h4>
                  <p className="text-slate-900 text-sm font-bold tracking-tight">
                    support@sageshelf.com
                  </p>
                </div>
              </div>

              {/* Location Element Block */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all group">
                <div className="p-3 bg-slate-950 text-emerald-400 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-slate-400 text-[9px] uppercase tracking-wider font-mono">
                    Tech Node Location
                  </h4>
                  <p className="text-slate-900 text-sm font-bold tracking-tight">
                    Tech Hub, Multan, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: PREMIUM FORM INTERFACE CANVAS --- */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-slate-50/50 border border-slate-200/50 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-md shadow-2xl shadow-slate-950/1">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Name & Email Field Pair */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-100/60 border border-transparent rounded-xl p-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all placeholder-slate-400"
                      placeholder="e.g. Jonas Davies"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-100/60 border border-transparent rounded-xl p-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all placeholder-slate-400"
                      placeholder="e.g. jonas@example.com"
                    />
                  </div>
                </div>

                {/* Subject Routing Dropdown Option List */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono ml-1">
                    Log Routing Parameter (Subject)
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-100/60 border border-transparent rounded-xl p-4 text-xs font-bold text-slate-700 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Seller Support Block</option>
                      <option>Technical Route Issue</option>
                      <option>Copyright / DMCA Notice</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <Layers size={14} />
                    </div>
                  </div>
                </div>

                {/* Message Context Textarea Container */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono ml-1">
                    Your Message Context
                  </label>
                  <textarea
                    rows="5"
                    className="w-full bg-slate-100/60 border border-transparent rounded-xl p-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 outline-none resize-none transition-all placeholder-slate-400"
                    placeholder="Describe how we can help you integrate or safely scale your content options within the archive hub ecosystem..."
                  />
                </div>

                {/* High Contrast Submission Action Link */}
                <button className="w-full bg-slate-950 hover:bg-slate-900 text-white py-4.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all shadow-md active:scale-[0.995] flex items-center justify-center gap-2.5 cursor-pointer">
                  Transmit Log Message{" "}
                  <Send
                    className="w-3.5 h-3.5 text-emerald-400"
                    strokeWidth={2.5}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
