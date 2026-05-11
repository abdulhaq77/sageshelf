import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PlayCircle, Download, Search } from "lucide-react";
import EmptyState from "../../components/EmptyState";

export default function MyLibrary() {
  const navigate = useNavigate();
  // Set to [] to test EmptyState
  const ownedBooks = [
    {
      id: "b1",
      title: "Atomic Habits",
      author: "James Clear",
      progress: 65,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400",
    },
    {
      id: "b2",
      title: "Project Hail Mary",
      author: "Andy Weir",
      progress: 10,
      image:
        "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80&w=400",
    },
  ];

  if (ownedBooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <EmptyState
          title="Your library is waiting"
          message="Once you purchase a book, it will appear here forever. Ready to start your collection?"
          Icon={BookOpen}
          actionText="Visit Bookstore"
          onAction={() => navigate("/categories")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Library</h1>
          <p className="text-slate-500 text-sm">
            You own {ownedBooks.length} books
          </p>
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your books..."
            className="pl-10 pr-4 py-2 border rounded-full bg-slate-50 focus:ring-2 ring-primary/20 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedBooks.map((book) => (
          <div
            key={book.id}
            className="flex gap-4 p-4 border rounded-2xl bg-white hover:shadow-md transition-shadow"
          >
            <img
              src={book.image}
              className="w-24 h-32 object-cover rounded-lg shadow-sm"
            />
            <div className="flex flex-col flex-1">
              <h3 className="font-bold text-slate-800 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4">{book.author}</p>

              <div className="mt-auto space-y-3">
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {book.progress}% Read
                  </span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-blue-700">
                    <PlayCircle size={14} /> Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
