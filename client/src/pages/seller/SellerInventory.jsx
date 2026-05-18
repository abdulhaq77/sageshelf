import React, { useState, useMemo, act } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  BookOpen,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import SharedSearchBar from "../../components/SharedSearchBar";

// coulmns list
const filtersList = [
  { key: "All", label: "All" },
  { key: "Active", label: "Active" },
];

export default function SellerInventory() {
  // 1. DATA STATE
  const [books] = useState([
    {
      id: 1,
      title: "The Modern React Guide",
      price: 24.0,
      stock: 45,
      sales: 128,
      status: "Active",
    },
    {
      id: 2,
      title: "Mastering Tailwind v4",
      price: 19.99,
      stock: 12,
      sales: 89,
      status: "Active",
    },
    {
      id: 3,
      title: "Node.js Architecture",
      price: 32.5,
      stock: 0,
      sales: 54,
      status: "Out of Stock",
    },
    {
      id: 4,
      title: "UX for Developers",
      price: 15.0,
      stock: 82,
      sales: 210,
      status: "Active",
    },
  ]);

  // 2. FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 3. FILTER LOGIC
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, books]);

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Inventory
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage {filteredBooks.length} digital titles
          </p>
        </div>
        <Link
          to="/seller/add-new-book"
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 cursor-pointer"
        >
          <Plus size={16} /> Add New Book
        </Link>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SharedSearchBar />
        {/* Status Dropdown Filter */}
        <div className="relative min-w-40">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-100 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
          >
            {filtersList.map((filter) => {
              return (
                <option key={filter.key} value={filter.key}>
                  {filter.label}
                </option>
              );
            })}
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            size={14}
          />
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Book Item
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Price
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Stock
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-slate-50/30 transition-colors group animate-in fade-in duration-300"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-slate-100 rounded-xl shrink-0 border border-slate-200 flex items-center justify-center">
                          <BookOpen size={20} className="text-slate-300" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">
                            {book.title}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${
                              book.status === "Active"
                                ? "bg-success/10 text-success"
                                : "bg-danger/10 text-danger"
                            }`}
                          >
                            {book.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${book.stock === 0 ? "text-danger" : "text-slate-600"}`}
                        >
                          {book.stock}
                        </span>
                        {book.stock === 0 && (
                          <AlertCircle size={14} className="text-danger" />
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all cursor-pointer">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-all cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={40} className="text-slate-100" />
                      <p className="text-sm font-bold text-slate-400">
                        No books found matching your criteria
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("All");
                        }}
                        className="text-accent text-[10px] font-black uppercase tracking-widest mt-2 hover:underline"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
