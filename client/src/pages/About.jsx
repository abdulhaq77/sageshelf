import React from "react";
import { Library, Users, ShieldCheck, Globe } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Digital Assets", value: "50k+" },
    { label: "Active Scholars", value: "120k+" },
    { label: "Expert Sellers", value: "5k+" },
    { label: "Countries", value: "40+" },
  ];

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <section className="bg-primary py-24 px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 italic">
          Preserving <span className="text-[#a3b18a]">Knowledge</span>.
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          SageShelf is a premium digital archive and marketplace designed to
          bridge the gap between knowledge seekers and specialized content
          creators.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 text-center"
            >
              <h2 className="text-3xl font-black text-slate-900 mb-1">
                {stat.value}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Content */}
      <section className="max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
              Our Mission
            </h3>
            <p className="text-slate-500 leading-loose">
              In a world of fragmented information, SageShelf serves as a
              centralized hub for high-quality digital resources. From technical
              scripts and C++ architectures to Punjabi literature and legal
              archives, we ensure that valuable data is never lost.
            </p>
          </div>
          <div className="md:w-1/2 bg-slate-50 rounded-[40px] p-8 aspect-video flex items-center justify-center">
            <Library className="w-20 h-20 text-[#a3b18a] opacity-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <ShieldCheck />,
              title: "Secure Access",
              desc: "Verified digital products with instant download security.",
            },
            {
              icon: <Users />,
              title: "Creator First",
              desc: "Empowering developers and writers to monetize their expertise.",
            },
            {
              icon: <Globe />,
              title: "Global Reach",
              desc: "Connecting the archive from Pakistan to a global audience.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-[#a3b18a] mb-4 inline-block">
                {item.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
