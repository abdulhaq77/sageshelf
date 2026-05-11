import React from "react";
import {
  Rocket,
  DollarSign,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Zap,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StartSelling() {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Low Commission",
      desc: "Keep 95% of every sale. We only take a 5% service fee to maintain the archive.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Payouts",
      desc: "Get your earnings transferred to your local bank or digital wallet instantly.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "DRM Protection",
      desc: "Secure digital rights management to protect your scripts and ebooks from piracy.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Seller Analytics",
      desc: "Track your sales, downloads, and customer demographics in real-time.",
    },
  ];

  return (
    <div className="w-full pb-20 bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-6 overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#a3b18a20,transparent)] opacity-50"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <Rocket className="w-4 h-4 text-[#a3b18a]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Now accepting new creators
            </span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 italic">
            Monetize your <span className="text-[#a3b18a]">Intellect</span>.
          </h1>

          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Join the premium marketplace for digital books, scripts, and
            research. Turn your side projects into a passive income stream.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/auth?role=seller"
              className="w-full sm:w-auto bg-[#10b981] text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-[#059669] transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 group"
            >
              Open Your Store{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="text-white font-black text-xs uppercase tracking-widest hover:text-[#a3b18a] transition-colors"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* --- BENEFITS GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-[#a3b18a]/30 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#a3b18a] mb-6 shadow-sm group-hover:bg-[#a3b18a] group-hover:text-white transition-all">
                {b.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">
                {b.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- THREE STEP PROCESS --- */}
      <section
        id="how-it-works"
        className="bg-slate-50 py-24 px-6 rounded-[4rem] mx-4 lg:mx-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">
              From File to <span className="text-[#a3b18a]">Profit</span>
            </h2>
            <p className="text-slate-500 mt-2">
              Three simple steps to start earning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload Assets",
                desc: "Upload your PDFs, ZIP files, or scripts to our secure cloud.",
              },
              {
                step: "02",
                title: "Set Price",
                desc: "Choose your price in PKR or USD. We handle currency conversion.",
              },
              {
                step: "03",
                title: "Earn Daily",
                desc: "Withdraw your earnings directly to your preferred account.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <span className="text-7xl font-black text-slate-100 absolute -top-8 -left-4 z-0 tracking-tighter select-none">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h4 className="text-xl font-black text-slate-900 mb-4">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-loose">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="max-w-5xl mx-auto px-6 mt-32">
        <div className="bg-[#0f172a] rounded-[3.5rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          {/* Decorative Store Icon */}
          <Store className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />

          <div className="lg:w-2/3 relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6 italic leading-tight">
              Ready to showcase <br /> your{" "}
              <span className="text-[#a3b18a]">Expertise?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-0 leading-relaxed">
              Join 5,000+ creators contributing to the world's fastest growing
              digital archive.
            </p>
          </div>

          <div className="lg:w-1/3 flex justify-center relative z-10">
            <Link
              to="/auth?role=seller"
              className="bg-[#a3b18a] hover:bg-[#8e9d75] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#a3b18a]/20"
            >
              Sign Up as Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
