import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  Star,
  DollarSign,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";

// Absolute decoupled sub-component allocations
import BuyerBookCard from "../components/buyer/BuyerBookCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import MiniLoader from "../components/spinners/MiniLoader.jsx";
import { getSearchedBooks } from "../api/endpoints.js";

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("searching... : ", searchParams);

  // Core Functional System Data States
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Active Filter Pipeline States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination Framework Control Setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mobile Off-Canvas Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse string configuration from global search queries
  const currentSearchQuery = searchParams.get("search") || "";

  // Static Configuration Option Maps
  const categoriesList = [
    { id: "all", name: "All Master Catalog" },
    { id: "programming", name: "Development & Engineering" },
    { id: "romance", name: "Contemporary Romance" },
    { id: "fiction", name: "Fiction & Literature" },
    { id: "business", name: "SaaS Business & Startups" },
    { id: "design", name: "UI/UX Product Design" },
    { id: "marketing", name: "Growth Marketing" },
  ];

  const sortList = [
    { id: 1, value: "newest", title: "Newest Releases" },
    { id: 2, value: "price-low", title: "Price: Low to High" },
    { id: 3, value: "price-high", title: "Price: High to Low" },
    { id: 4, value: "rating", title: "Top Rated" },
  ];

  const priceRangesList = [
    { id: "all", name: "Any Price Range" },
    { id: "under-15", name: "Tier 1 (Under $15)" },
    { id: "15-30", name: "Tier 2 ($15 - $30)" },
    { id: "over-30", name: "Premium Tier (Over $30)" },
  ];

  const ratingsList = [
    { id: "all", name: "Any Platform Rating" },
    { id: "4", name: "Top-Tier (4.0★ & Above)" },
    { id: "3", name: "Mid-Tier (3.0★ & Above)" },
  ];

  // Primary API Query Controller Pipeline Effect
  useEffect(() => {
    const fetchFilteredBooks = async () => {
      setIsLoading(true);
      try {
        const queryParams = {
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          price: priceRange !== "all" ? priceRange : undefined,
          rating: minRating !== "all" ? minRating : undefined,
          search: currentSearchQuery || undefined,
          sort: sortBy,
          page: currentPage,
          limit: itemsPerPage,
        };

        const response = await getSearchedBooks(queryParams);

        if (response.data?.success) {
          setBooks(response.data.books || []);
          setTotalItems(
            response.data.totalItems ||
              (response.data.books ? response.data.books.length : 0),
          );
        }
      } catch (error) {
        console.error("Error executing filter updates:", error);
        setBooks([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredBooks();
  }, [
    currentSearchQuery,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
    currentPage,
  ]);

  // Reset page pagination anchor back to index 1 when parameters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedCategory, priceRange, minRating, currentSearchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setMinRating("all");
    setSortBy("newest");
    setSearchParams({});
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Clean pure-function layout renderer to prevent execution tree duplication loops
  const renderFilterControls = () => (
    <div className="space-y-7">
      {/* Active Filter Notification Badge */}
      {currentSearchQuery && (
        <div className="bg-slate-900 text-white p-4 rounded-3xl space-y-1.5 shadow-xl shadow-slate-950/10">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest font-mono">
              Active Search Parameter
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-black truncate uppercase font-mono tracking-tight">
              "{currentSearchQuery}"
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="text-[9px] font-black uppercase text-slate-400 hover:text-white transition-colors underline shrink-0 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Pricing Tiers Selection Block */}
      <div className="space-y-2.5">
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
          <DollarSign size={11} /> Pricing Tiers
        </label>
        <div className="space-y-1">
          {priceRangesList.map((pr) => (
            <button
              key={pr.id}
              onClick={() => setPriceRange(pr.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                priceRange === pr.id
                  ? "bg-slate-950 border border-slate-900 text-white shadow-md shadow-slate-950/10"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
              }`}
            >
              {pr.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Threshold Selection Block */}
      <div className="space-y-2.5">
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
          <Star size={11} /> Quality Threshold
        </label>
        <div className="space-y-1">
          {ratingsList.map((rt) => (
            <button
              key={rt.id}
              onClick={() => setMinRating(rt.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                minRating === rt.id
                  ? "bg-slate-950 border border-slate-900 text-white shadow-md shadow-slate-950/10"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
              }`}
            >
              {rt.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-350 mx-auto px-4 lg:px-8 py-6 min-h-[calc(100vh-5rem)] bg-white text-slate-800 font-sans">
      {/* HEADER CONTROL STRIP */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            SaaS Asset Inventory
          </h1>
          <p className="text-xs text-slate-400 font-medium tracking-tight">
            Analyze and access high-conversion marketplace products
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-auto justify-between sm:justify-end">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-950 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            <Sliders size={13} /> Filters
          </button>

          {/* Sorting Select Component Dropdown wrapper */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 font-mono">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-tight text-slate-700 outline-none cursor-pointer border-none p-0 pr-2"
            >
              {sortList.map((listItem) => (
                <option key={listItem.id} value={listItem.value}>
                  {listItem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">
        {/* SIDEBAR NAVIGATION BLOCK (Desktop layouts) */}
        <aside className="hidden lg:block lg:col-span-1 border border-slate-200/60 rounded-4xl p-6 sticky top-24 bg-slate-50/50 backdrop-blur-md overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-none">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-slate-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 font-mono">
                Engine Parameters
              </span>
            </div>
            {(selectedCategory !== "all" ||
              priceRange !== "all" ||
              minRating !== "all" ||
              currentSearchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-0.5 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          {renderFilterControls()}
        </aside>

        {/* MAIN DISPLAY INVENTORY MATRIX PANEL */}
        <main className="col-span-1 lg:col-span-3 space-y-6">
          {/* HORIZONTAL CATEGORIES SCROLL GRID PANEL */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="flex gap-2 overflow-x-auto pb-3 pt-0.5 px-1 scrollbar-none scroll-smooth snap-x">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-200 border snap-center cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-950/10 scale-[1.01]"
                      : "bg-slate-50 border-slate-200/60 text-slate-500 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Layers size={11} className="opacity-60" />
                    <span>{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* DYNAMIC COMPONENT STATE ROUTER HUB */}
          {isLoading ? (
            <MiniLoader
              message="Syncing Catalog Array"
              subMessage="Fetching premium high-conversion assets from secure pipeline channels..."
              minHeight="min-h-[400px]"
            />
          ) : books.length === 0 ? (
            <EmptyState
              title="Data Matrix Out of Range"
              message="No products match your custom dashboard configurations or search terms. Try modifying your parameter query filters."
              actionText="Reset All Filters"
              onAction={handleClearFilters}
              showBackButton={false}
            />
          ) : (
            /* Premium Content Map Card Grid Wrapper mapping */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {books.map((book) => (
                <BuyerBookCard
                  key={book._id || book.id}
                  book={{
                    id: book._id || book.id,
                    title: book.title,
                    author: book.author || "Independent Developer",
                    img: book.coverUrl,
                    category: book.category || book.genre || "SaaS",
                    price:
                      typeof book.price === "number"
                        ? `$${book.price}`
                        : book.price,
                    discountPrice: book.discountPrice
                      ? typeof book.discountPrice === "number"
                        ? `$${book.discountPrice}`
                        : book.discountPrice
                      : null,
                    rating: book.rating,
                    reviews: book.reviews,
                  }}
                />
              ))}
            </div>
          )}

          {/* PREMIUM PAGINATION HUD CONTROLLER BAR */}
          {!isLoading && books.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-8">
              <span className="text-[11px] font-black uppercase text-slate-400 font-mono tracking-tight">
                Page logs: {currentPage} / {totalPages} ({totalItems} items
                synced)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center"
                >
                  <ChevronLeft size={14} strokeWidth={2.5} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all border font-mono cursor-pointer flex items-center justify-center ${
                        currentPage === pageNum
                          ? "bg-slate-950 border-slate-950 text-white shadow-md shadow-slate-950/10"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ),
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center"
                >
                  <ChevronRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE BREAKPOINT OFF-CANVAS RESPONSIVE DRAWER FRAME */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 bg-white p-6 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={13} className="text-slate-900" />
                <span className="text-[10px] font-black uppercase tracking-wider font-mono">
                  Mobile Parameters
                </span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-full cursor-pointer flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-none">
              {renderFilterControls()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
