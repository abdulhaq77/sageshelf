import { Heart, ShoppingCart, Share2, Trash2, ArrowRight } from "lucide-react";
import EmptyState from "../components/EmptyState";
import { useState } from "react";

export default function Wishlist() {
  const initialWishlist = [
    {
      id: "b1",
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 18.5,
      image: "...",
      rating: 4.8,
      category: "Fiction",
    },
    {
      id: "b3",
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: 25.99,
      image: "...",
      rating: 4.7,
      category: "Sci-Fi",
    },
  ];

  const [wishlist, setWishlist] = useState(initialWishlist); // Your data

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Dreaming of a new book?"
        message="Save your future favorites here."
        Icon={Heart}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Collection</h1>
          <p className="text-slate-500">Items saved for future consideration</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <Share2 size={16} /> Share List
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="group">
            {/* Visual focus on the book cover */}
            <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-slate-200 shadow-sm transition-shadow hover:shadow-xl">
              <img
                src={item.image}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <button
                // onClick={() => remove(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} className="text-slate-600" />
              </button>
            </div>

            <h3 className="font-bold text-slate-900 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-slate-500 mb-3">{item.author}</p>

            {/* Action: Move to high-intent zone */}
            <button
              //   onClick={() => moveToCart(item)}
              className="w-full py-2 flex items-center justify-center gap-2 rounded-md bg-slate-100 hover:bg-primary hover:text-white transition-colors text-xs font-bold"
            >
              Move to Cart <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
