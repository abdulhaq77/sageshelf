import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function BookDetails() {
  // States
  const [activeTab, setActiveTab] = useState("description");

  // Mock Data Vector Object
  const book = {
    title: "Modern React Patterns",
    author: "Dev Archive",
    price: "PKR 1,500",
    discountPrice: "PKR 1,200",
    rating: 4.8,
    reviewsCount: 124,
    category: "Programming",
    format: "PDF, EPUB",
    size: "12.4 MB",
    pages: 342,
    description:
      "Master the latest React patterns for 2026. This comprehensive guide covers Hooks, Suspense, Concurrent Mode, and Server Components with practical, real-world examples designed for full-stack developers.",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600",
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- BREADCRUMB & UTILITY HEADER ACTIONS --- */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-emerald-500 font-mono transition-colors cursor-pointer">
            <ChevronLeft size={14} strokeWidth={2.5} /> Back to Library
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl border border-slate-200/60 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer">
              <Share2 size={16} />
            </button>
            <button className="p-2.5 rounded-xl border border-slate-200/60 text-slate-400 hover:text-rose-500 hover:bg-rose-50/40 hover:border-rose-200 transition-all cursor-pointer">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN INTERFACE SPLIT CANVAS LAYOUT --- */}
      <main className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* --- LEFT LAYER: BOOK COVER & SPEC BLOCKS --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              {/* Image Frame Canvas container */}
              <div className="aspect-3/4 rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl shadow-slate-950/20 group relative">
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent pointer-events-none z-10" />
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Technical Parameter Specs Grid Array mapping */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "PAGE COUNT", val: book.pages },
                  { label: "ASSET FORMAT", val: book.format },
                  { label: "STORAGE SIZE", val: book.size },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200/40 rounded-2xl p-4 text-center group hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono mb-1">
                      {spec.label}
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      {spec.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT LAYER: ARCHIVE DATA & PRODUCT ACTION PANELS --- */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Meta Taxonomy Identity Tags */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-md">
                <Sparkles size={10} className="text-emerald-500" />
                <span className="text-slate-700 font-black text-[9px] tracking-widest uppercase font-mono">
                  {book.category}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                {book.title}
              </h1>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                Repository node:{" "}
                <span className="text-slate-600 font-bold">{book.author}</span>
              </p>
            </div>

            {/* Quality Integrity Score Metas */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                <Star size={12} fill="#d97706" className="text-amber-600" />
                <span className="text-xs font-black text-amber-700 font-mono">
                  {book.rating}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 underline decoration-slate-200 underline-offset-4">
                {book.reviewsCount} Developer Verifications
              </span>
            </div>

            {/* Commercial Procurement Panel Block */}
            <div className="p-6 rounded-4xl border border-slate-200/60 bg-slate-50/50 space-y-6">
              <div className="flex items-end gap-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">
                    Valuation Cost
                  </span>
                  <span className="text-4xl font-black text-slate-900 tracking-tight font-mono">
                    {book.discountPrice}
                  </span>
                </div>
                <span className="text-base text-slate-300 font-mono line-through mb-1">
                  {book.price}
                </span>
                <span className="ml-auto bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest font-mono border border-emerald-500/20">
                  Save 20%
                </span>
              </div>

              {/* Functional CTA Button Group Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 h-13 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono flex items-center justify-center gap-2 hover:bg-slate-200/80 active:scale-[0.99] transition-all cursor-pointer">
                  <ShoppingCart size={14} strokeWidth={2.5} /> Add to Cart
                </button>
                <button className="flex-1 bg-slate-900 text-white h-13 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-slate-950/10">
                  Buy Asset Now
                </button>
              </div>

              {/* Cryptographic Trust Badges Ecosystem */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between pt-4 border-t border-slate-200/60">
                <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">
                  <ShieldCheck size={12} className="text-emerald-500" /> Secure
                  Pipeline
                </div>
                <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">
                  <CheckCircle2 size={12} className="text-emerald-500" />{" "}
                  Verified Content
                </div>
                <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">
                  <Clock size={12} className="text-emerald-500" /> Instant CDN
                  Delivery
                </div>
              </div>
            </div>

            {/* Navigation Tabs Layer Interface */}
            <div className="pt-4">
              <div className="flex gap-8 border-b border-slate-200/60">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] font-mono transition-all relative cursor-pointer ${
                      activeTab === tab
                        ? "text-emerald-500"
                        : "text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Contextual Route Render Panels */}
              <div className="py-6">
                {activeTab === "description" && (
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {book.description}
                  </p>
                )}
                {activeTab === "details" && (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">
                        Published
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        February 2026
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">
                        Publisher
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        SageShelf Originals
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">
                        Language
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        English
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="flex flex-col items-center py-10 bg-slate-50 border border-slate-200/40 rounded-2xl">
                    <Star size={24} className="text-slate-300 mb-2" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
                      No review signatures logged yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
