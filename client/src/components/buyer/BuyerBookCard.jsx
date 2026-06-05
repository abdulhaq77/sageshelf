import React from "react";
import { Heart, ShoppingCart, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function BuyerBookCard({ book }) {
  // Retaining internal logical variables
  const hasDiscount = book.discountPrice && book.discountPrice < book.price;
  const rating = book.rating || 4.5;
  const totalReviews = book.reviews || 12;
  const id = book.id;

  return (
    <Link to={`/book/details/${id}`} className="group block h-full">
      <div className="bg-white rounded-4xl border border-slate-200/60 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-950/3 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
        {/* --- UPPER PART: IMAGE FRAME CANVAS --- */}
        <div className="relative aspect-3/4 overflow-hidden bg-slate-950 border-b border-slate-100">
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={book.img}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* SaaS Micro-Badge Category Tag (Top Left) */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-sm flex items-center gap-1">
            <Sparkles size={8} className="text-emerald-500" />
            <span className="text-slate-800 font-black text-[8px] tracking-wider uppercase font-mono">
              {book.category}
            </span>
          </div>
        </div>

        {/* --- MIDDLE PART: TELEMETRY CONTENT DATA --- */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-5">
          <div className="space-y-1.5">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
              Node: {book.author}
            </p>
            <h3 className="font-black text-slate-900 text-sm line-clamp-1 uppercase group-hover:text-emerald-500 transition-colors duration-200">
              {book.title}
            </h3>

            {/* Dynamic Five Star Rendering Framework Loop */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                    className={i < Math.floor(rating) ? "" : "text-slate-200"}
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-500 font-mono">
                ({totalReviews})
              </span>
            </div>
          </div>

          {/* --- BOTTOM PART: COMMERCIAL TRANSACTION AND PROCUREMENT BAR --- */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
            {/* Price Visualization Layout Label Block */}
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono leading-none mb-1">
                Asset Valuation Cost
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-slate-900 font-mono tracking-tight leading-none">
                  {hasDiscount ? book.discountPrice : book.price}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-300 font-mono line-through leading-none">
                    {book.price}
                  </span>
                )}
              </div>
            </div>

            {/* Responsive Action Matrix Controller Grid */}
            <div className="flex items-center justify-between gap-2.5">
              {/* Central Primary Procurement Handle */}
              <Link
                to={`/book/checkout/${id}`}
                className="flex-1 bg-slate-950 text-white h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest font-mono flex items-center justify-center hover:bg-slate-900 active:scale-[0.98] transition-all shadow-md shadow-slate-950/10 cursor-pointer"
              >
                Buy Now
              </Link>

              {/* Secondary Modular Utility Container Handles */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Shopping Cart Trigger */}
                <Link
                  to={`/buyer/cart`}
                  title="Add asset to shopping cart"
                  className="w-10 h-10 bg-slate-50 text-slate-700 hover:text-emerald-500 rounded-xl border border-slate-200/60 hover:bg-white hover:border-slate-300 transition-all active:scale-[0.93] cursor-pointer flex items-center justify-center"
                >
                  <ShoppingCart size={13} strokeWidth={2.5} />
                </Link>

                {/* Wishlist Tracking Trigger */}
                <Link
                  to={`/buyer/wishlist`}
                  title="Add asset to wishlist tracks"
                  className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-200/60 hover:bg-white hover:border-rose-100 transition-all active:scale-[0.93] cursor-pointer flex items-center justify-center"
                >
                  <Heart size={13} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
