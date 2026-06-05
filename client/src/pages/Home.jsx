import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedSection from "../components/FeaturedSection.jsx";

export default function Home() {
  return (
    <div className="flex flex-col w-full pb-20 bg-white">
      {/* --- PREMIUM DARK METRIC HERO SECTION --- */}
      <section className="relative w-full bg-slate-950 pt-20 pb-32 px-6 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem] shadow-xl shadow-slate-950/10">
        {/* Neon Ambient Vector Canvas Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/4 blur-[130px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/3 blur-[100px] rounded-full translate-y-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            {/* SaaS Micro-Badge */}
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full self-center lg:self-start">
              <Sparkles size={10} className="text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-black text-[9px] tracking-[0.25em] uppercase font-mono">
                Knowledge Engineering Hub
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Unlock the <br />{" "}
              <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Knowledge
              </span>{" "}
              of Ages.
            </h1>

            <p className="text-slate-400 text-base max-w-lg leading-relaxed font-medium">
              Access a premium curated library of verified digital engineering
              resources, elite law codex briefs, and specialized technical
              blueprints.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/categories"
                className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-slate-100 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5 cursor-pointer"
              >
                Explore Categories{" "}
                <ArrowRight
                  className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>

          {/* Framed Graphic Container Mock */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[40px] blur-xl pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1481627564025-3c8b5c146d77?q=80&w=800"
              className="rounded-[40px] shadow-2xl border border-slate-800/80 object-cover w-full h-100 lg:h-125 transition-all duration-300 group-hover:border-slate-700"
              alt="Knowledge Grid"
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED INVENTORY SECTION --- */}
      <FeaturedSection />
    </div>
  );
}
