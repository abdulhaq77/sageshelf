import React from "react";
import { Library, Users, ShieldCheck, Globe, Sparkles } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Digital Assets", value: "50k+" },
    { label: "Active Scholars", value: "120k+" },
    { label: "Expert Sellers", value: "5k+" },
    { label: "Countries", value: "40+" },
  ];

  return (
    <div className="w-full pb-20 bg-white">
      {/* --- HEADER: PREMIUM DARK METRIC SECTION --- */}
      <section className="relative bg-slate-950 py-24 px-6 text-center overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem] shadow-xl shadow-slate-950/10">
        {/* Subtle Ambient Radial Canvas Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-emerald-500/4 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          {/* SaaS Micro-Badge */}
          <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
            <Sparkles size={10} className="text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-black text-[9px] tracking-[0.25em] uppercase font-mono">
              Our Blueprint & DNA
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight">
            Preserving{" "}
            <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Knowledge
            </span>
            .
          </h1>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            SageShelf is a premium digital archive and enterprise marketplace
            designed to bridge the gap between knowledge seekers and specialized
            engineering content creators.
          </p>
        </div>
      </section>

      {/* --- STATS SECTION: HIGH-CONTRAST NEON FLOATING BADGES --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-950/3 border border-slate-100 text-center hover:border-slate-200 transition-all group"
            >
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-1 font-mono tracking-tight group-hover:text-emerald-500 transition-colors">
                {stat.value}
              </h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MISSION CONTENT & GRID LAYER --- */}
      <section className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-24">
        {/* Core Narrative Split Frame */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 font-mono">
                Core Objectives
              </span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                Our Mission
              </h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              In a world of fragmented information, SageShelf serves as a
              centralized hub for high-quality digital resources. From technical
              scripts and C++ architectures to native Punjabi literature and
              enterprise legal archives, we ensure that valuable production data
              is preserved and optimized.
            </p>
          </div>

          <div className="md:w-1/2 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 aspect-video flex items-center justify-center relative overflow-hidden group">
            {/* Ambient inner grid flare */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Library className="w-16 h-16 text-slate-900 opacity-25 group-hover:scale-105 group-hover:text-emerald-500 group-hover:opacity-40 transition-all duration-300" />
          </div>
        </div>

        {/* Triple Parameter Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6 border-t border-slate-100">
          {[
            {
              icon: <ShieldCheck size={20} strokeWidth={2.5} />,
              title: "SECURE ACCESS",
              desc: "Verified digital architectural assets with instant cryptographic download delivery pipelines.",
            },
            {
              icon: <Users size={20} strokeWidth={2.5} />,
              title: "CREATOR FIRST",
              desc: "Empowering developers, system engineers, and writers to safely monetize complex technical intellectual property.",
            },
            {
              icon: <Globe size={20} strokeWidth={2.5} />,
              title: "GLOBAL REACH",
              desc: "Connecting high-integrity local codebases and content hubs directly to an elite international consumer base.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left space-y-3.5 group">
              <div className="w-10 h-10 bg-slate-50 text-slate-900 border border-slate-200/60 rounded-xl flex items-center justify-center md:mx-0 mx-auto group-hover:bg-slate-950 group-hover:text-emerald-400 group-hover:border-slate-950 transition-all duration-200 shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-900 text-xs tracking-wider uppercase font-mono">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
