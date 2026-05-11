import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Download,
  ChevronLeft,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
// import { useSearchParams } from "react-router-dom";

export default function BookDetails() {
  // get id from url

  // const [id] = useSearchParams();

  // states
  const [activeTab, setActiveTab] = useState("description");

  // Mock data - in a real app, this would come from a useParams() hook and API
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
      {/* --- Breadcrumb & Actions Bar --- */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#a3b18a] transition-colors">
            <ChevronLeft size={16} /> Back to Library
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full border border-slate-100 text-slate-400 hover:text-[#a3b18a] hover:border-[#a3b18a] transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-2.5 rounded-full border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* --- LEFT: Book Cover --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="aspect-3/4 rounded-[48px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-200/50 group">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Quick Specs Under Cover */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Pages", val: book.pages },
                  { label: "Format", val: book.format },
                  { label: "Size", val: book.size },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="bg-slate-50/50 rounded-2xl p-4 text-center border border-slate-50"
                  >
                    <p className="text-[8px] font-black uppercase tracking-tighter text-slate-400 mb-1">
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

          {/* --- RIGHT: Details & Purchase --- */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-md bg-[#a3b18a]/10 text-[#a3b18a] text-[10px] font-black uppercase tracking-widest">
                  {book.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic">
                  {book.title}
                </h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  By {book.author}
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl">
                  <Star size={16} fill="#fbbf24" className="text-amber-400" />
                  <span className="font-black text-amber-700">
                    {book.rating}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 underline decoration-slate-200 underline-offset-4">
                  {book.reviewsCount} Reader Reviews
                </span>
              </div>

              {/* Price Section */}
              <div className="p-8 rounded-4xl border border-slate-100 bg-slate-50/30 space-y-6">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {book.discountPrice}
                  </span>
                  <span className="text-lg text-slate-300 line-through mb-1">
                    {book.price}
                  </span>
                  <span className="ml-auto bg-red-50 text-red-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-red-100">
                    Save 20%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="flex-1 bg-slate-900 text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button className="flex-1 bg-[#a3b18a] text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-[#a3b18a]/20">
                    Buy Now
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    <ShieldCheck size={14} className="text-[#a3b18a]" /> Secure
                    Transaction
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    <CheckCircle2 size={14} className="text-[#a3b18a]" />{" "}
                    Verified Content
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                    <Clock size={14} className="text-[#a3b18a]" /> Instant
                    Access
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="mt-10">
                <div className="flex gap-8 border-b border-slate-100">
                  {["description", "details", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                        activeTab === tab
                          ? "text-[#a3b18a]"
                          : "text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#a3b18a]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-8">
                  {activeTab === "description" && (
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {book.description}
                    </p>
                  )}
                  {activeTab === "details" && (
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          Published
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          February 2026
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          Publisher
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          SageShelf Originals
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          Language
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          English
                        </p>
                      </div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div className="flex flex-col items-center py-10 bg-slate-50 rounded-3xl opacity-40">
                      <Star size={32} className="text-slate-300 mb-2" />
                      <p className="text-[10px] font-black uppercase tracking-widest">
                        No reviews yet for this version
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
