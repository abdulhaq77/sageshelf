import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function BuyerBookCard({ book }) {
  const hasDiscount = book.discountPrice && book.discountPrice < book.price;
  const rating = book.rating || 4.5; // Defaulting for visual consistency
  const totalReviews = book.reviews || 12;
  const id = book.id;

  return (
    <Link to={`/book/details/${id}`}>
      <div className="bg-white rounded-4xl border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group flex flex-col h-full overflow-hidden">
        {/* --- UPPER PART: IMAGE & OVERLAYS --- */}
        <div className="relative aspect-3/4 overflow-hidden bg-slate-50">
          <img
            src={book.img}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 scale-110 group-hover:scale-100"
          />

          {/* Wishlist Overlay */}
          <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
            <Heart size={16} />
          </button>

          {/* Category Tag (Top Left) */}
          <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
            {book.category}
          </div>

          {/* Quick Add to Cart (Appears on Hover) */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white/90 backdrop-blur-md text-slate-900 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#a3b18a] hover:text-white transition-colors shadow-lg">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* --- LOWER PART: CONTENT --- */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm line-clamp-1 leading-tight group-hover:text-[#a3b18a] transition-colors">
              {book.title}
            </h3>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {book.author}
            </p>
          </div>

          {/* Ratings Section */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "" : "text-slate-200"}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-500">
              ({totalReviews})
            </span>
          </div>

          {/* Price and Buy Button */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-50">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[10px] text-slate-400 line-through decoration-red-400/50">
                  {book.price}
                </span>
              )}
              <span className="text-sm font-black text-slate-900 leading-none">
                {hasDiscount ? book.discountPrice : book.price}
              </span>
            </div>

            <Link
              to={`/book/checkout/${id}`}
              className="bg-[#a3b18a] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md shadow-[#a3b18a]/10"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
