import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredBooks = [
    {
      id: 1,
      title: "Modern React Patterns",
      author: "Dev Archive",
      price: "PKR 1,500",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400",
    },
    {
      id: 2,
      title: "The Art of C++",
      author: "Code Master",
      price: "PKR 2,200",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400",
    },
    {
      id: 3,
      title: "Data Structures",
      author: "Algorithm Lab",
      price: "PKR 1,800",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400",
    },
    {
      id: 4,
      title: "Bootstrap 5 Pro",
      author: "UI Library",
      price: "PKR 900",
      img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400",
    },
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full bg-[#0f172a] pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#a3b18a]/10 blur-[120px] rounded-full -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <span className="text-[#a3b18a] font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">
              Archive Hub
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter mb-6 italic">
              Unlock the <br />{" "}
              <span className="text-[#a3b18a]">Knowledge</span> of Ages.
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
              Access a premium curated library of digital books and technical
              guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/categories"
                className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-[#059669] transition-all flex items-center justify-center gap-2 group"
              >
                Explore Categories{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1481627564025-3c8b5c146d77?q=80&w=800"
              className="rounded-[40px] shadow-2xl border border-white/10 object-cover w-full h-[400px] lg:h-[500px]"
              alt="Knowledge"
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED BOOKS --- */}
      <section className="max-w-7xl mx-auto px-6 mt-20 w-full">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900">
            Featured Releases
          </h2>
          <Link
            to="/shop"
            className="text-xs font-black text-[#a3b18a] uppercase tracking-widest hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <div key={book.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] bg-slate-100 mb-4 shadow-lg border border-transparent group-hover:border-[#a3b18a]/30">
                <img
                  src={book.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={book.title}
                />
              </div>
              <h5 className="font-bold text-slate-900 leading-tight mb-1">
                {book.title}
              </h5>
              <p className="text-xs text-slate-400 font-medium mb-2">
                {book.author}
              </p>
              <p className="font-black text-sm text-[#10b981]">{book.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
