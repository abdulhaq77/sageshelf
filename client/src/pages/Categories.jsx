import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  Download,
} from "lucide-react";
import BuyerBookCard from "../components/buyer/BuyerBookCard";
import { Link } from "react-router-dom";

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
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
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
      discountPrice: "PKR 1,200",
      rating: 5,
      reviews: 45,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400",
    },
    {
      id: 2,
      title: "The Art of C++",
      category: "Programming",
      author: "Code Master",
      price: "PKR 2,200",
      rating: 4,
      reviews: 28,
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400",
    },
    {
      id: 3,
      title: "Civil Law Basics",
      category: "Law",
      author: "Advocate Khan",
      price: "PKR 3,500",
      discountPrice: "PKR 2,900",
      rating: 4.5,
      reviews: 120,
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400",
    },
    {
      id: 4,
      title: "UI Design 2026",
      category: "Design",
      author: "Pixel Studio",
      price: "PKR 1,200",
      rating: 5,
      reviews: 92,
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=400",
    },
  ];

  const filteredBooks =
    activeCategory === "All"
      ? allBooks
      : allBooks.filter((book) => book.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-slate-50/30">
      {/* --- Sticky Categories Header --- */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400"
          >
            <ChevronLeft size={20} />
          </button>

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
                    ? "bg-[#a3b18a] text-white border-[#a3b18a]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-[#a3b18a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
            {activeCategory}{" "}
            <span className="text-[#a3b18a] italic">Resources</span>
          </h2>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredBooks.map((book) => (
              <BuyerBookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 opacity-20">
            <Filter size={48} className="mb-4" />
            <p className="font-black uppercase tracking-tighter">Empty Shelf</p>
          </div>
        )}
      </main>
    </div>
  );
}
