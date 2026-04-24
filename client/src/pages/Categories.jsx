import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Filter } from "lucide-react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef(null);

  const categories = [
    "All",
    "Programming",
    "Literature",
    "Science",
    "Law",
    "Design",
    "Business",
    "History",
    "Medical",
    "Engineering",
    "Arts",
    "Psychology",
  ];

  // Manual scroll logic
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const allBooks = [
    {
      id: 1,
      title: "Modern React Patterns",
      category: "Programming",
      author: "Dev Archive",
      price: "PKR 1,500",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400",
    },
    {
      id: 2,
      title: "The Art of C++",
      category: "Programming",
      author: "Code Master",
      price: "PKR 2,200",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400",
    },
    {
      id: 3,
      title: "Civil Law Basics",
      category: "Law",
      author: "Advocate Khan",
      price: "PKR 3,500",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400",
    },
    {
      id: 4,
      title: "UI Design 2026",
      category: "Design",
      author: "Pixel Studio",
      price: "PKR 1,200",
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=400",
    },
  ];

  const filteredBooks =
    activeCategory === "All"
      ? allBooks
      : allBooks.filter((book) => book.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* --- Sticky Header with Navigation Arrows --- */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar py-4 scroll-smooth"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#a3b18a] text-white border-[#a3b18a] shadow-md shadow-[#a3b18a]/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-[#a3b18a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- Grid Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 italic">
            {activeCategory} <span className="text-[#a3b18a]">Hub</span>
          </h2>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-10">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-slate-50 mb-4 border border-slate-100 group-hover:border-[#a3b18a]/40 transition-all group-hover:shadow-xl group-hover:shadow-slate-100">
                  <img
                    src={book.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={book.title}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#0f172a]/80 backdrop-blur text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
                    {book.category}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#a3b18a] transition-colors">
                  {book.title}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-black text-xs text-[#10b981]">
                    {book.price}
                  </span>
                  <button className="text-slate-300 hover:text-[#a3b18a] transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-30">
            <Filter className="w-12 h-12 mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">
              No resources found in this shelf
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
