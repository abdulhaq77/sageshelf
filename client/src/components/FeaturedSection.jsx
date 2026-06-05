import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import BuyerBookCard from "./buyer/BuyerBookCard.jsx";
import MiniLoader from "../components/spinners/MiniLoader.jsx";
import { usePublicBooks } from "../context/public/PublicBookContext.jsx";

export default function FeaturedSection() {
  const { fetauredBooks, isBooksLoading } = usePublicBooks();

  // Hide the entire section layout visually if no books are returned
  if (!isBooksLoading && (!fetauredBooks || fetauredBooks.length === 0))
    return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mt-24 w-full">
      {isBooksLoading ? (
        <MiniLoader />
      ) : (
        <>
          {/* --- SECTION GRID HEADER CONTROL BOARD --- */}
          <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                Featured Releases
              </h2>
              <p className="text-xs text-slate-400 font-bold font-mono uppercase tracking-wider mt-0.5">
                High-Conversion Marketplace Inventory
              </p>
            </div>
            <Link
              to="/categories"
              className="text-[10px] font-black text-emerald-500 hover:text-emerald-600 uppercase tracking-widest font-mono transition-colors border-b border-transparent hover:border-emerald-500/50 pb-1"
            >
              View All Assets
            </Link>
          </div>

          {/* --- SLIDER CONTROLLER WRAPPER LAYER --- */}
          {/* snap-x ensures slide snapping, no-scrollbar hides ugly default scroll tracks */}
          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 no-scrollbar">
            {isBooksLoading
              ? [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="min-w-70 sm:min-w-[320px] md:min-w-70 lg:min-w-[calc(25%-1.5rem)] shrink-0 bg-slate-50 border border-slate-100 rounded-4xl p-5 space-y-4 animate-pulse snap-start"
                  >
                    <div className="aspect-3/4 w-full bg-slate-200 rounded-2xl" />
                    <div className="h-3 w-1/3 bg-slate-200 rounded-md" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded-md" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded-md" />
                  </div>
                ))
              : fetauredBooks.map((book) => (
                  /* Card alignment and size control properties */
                  <div
                    key={book._id || book.id}
                    className="min-w-70 sm:min-w-[320px] md:min-w-70 lg:min-w-[calc(25%-1.5rem)]shrink-0 snap-start"
                  >
                    <BuyerBookCard
                      book={{
                        id: book._id || book.id,
                        title: book.title,
                        author: book.author,
                        category: book.category,
                        price:
                          typeof book.price === "number"
                            ? `PKR ${book.price.toLocaleString()}`
                            : book.price,
                        img: book.coverUrl,
                        rating: book.rating,
                      }}
                    />
                  </div>
                ))}
          </div>
        </>
      )}
    </section>
  );
}
