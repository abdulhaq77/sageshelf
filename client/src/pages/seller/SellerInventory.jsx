import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  BookOpen,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SharedSearchBar from "../../components/SharedSearchBar";
import { useSeller } from "../../context/SellerContext.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import MiniLoader from "../../components/spinners/MiniLoader.jsx";
import SharedWarningModal from "../../components/SharedWarningModal.jsx";

const filtersList = [
  { key: "All", label: "All" },
  { key: "Active", label: "Active" },
  { key: "Draft", label: "Draft" },
];

export default function SellerInventory() {
  // Hooks & Context States (Promoted currentPage to context layer to persist across component unmounts)
  const {
    books,
    totalItems = 0,
    currentPage,
    setCurrentPage,
    handleFetchSellerInventory,
    handleUpdateBookStatus,
    handleDeleteBookListing,
  } = useSeller();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Track the last page fetched in this mount lifecycle to ensure we don't refetch the exact same block
  const lastFetchedPageRef = useRef(null);

  // Dynamic state configuration object for warning modals
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    variant: "danger",
    action: () => {},
  });

  // FILTER STATES (Kept local for user input typing performance)
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🔄 OPTIMIZED DATA FETCH EFFECT
  useEffect(() => {
    // GUARD RULE: If the current context page has already been structuralized during this mount, skip API call
    if (books.length > 0 && lastFetchedPageRef.current === currentPage) {
      return;
    }

    const getInventoryChunk = async () => {
      setIsLoading(true);
      try {
        await handleFetchSellerInventory(currentPage, itemsPerPage);
        lastFetchedPageRef.current = currentPage; // Lock the current marker position
      } catch (error) {
        console.error("Error fetching inventory data chunks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInventoryChunk();
  }, [currentPage, handleFetchSellerInventory]); // 👈 ONLY triggers when pagination index position updates

  // Safety Boundary: If search constraints change, safely fallback to index 1
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, statusFilter]);

  // LOCAL MEMOIZED DATA FILTERS
  const filteredBooks = useMemo(() => {
    const safetyBooks = books || [];
    return safetyBooks.filter((book) => {
      const matchesSearch = (book.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, books]);

  // SERVER PAGINATION MATHEMATICS
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // NAVIGATION EVENT ROUTERS
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 🚫 DELETION MODAL TRIGGER
  const triggerDeleteWarning = (bookId, title) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Product Listing?",
      message: `Are you absolutely sure you want to remove "${title}"? This action drops all database metrics and Cloudinary files permanently. This operation cannot be undone.`,
      confirmText: "Delete Asset",
      variant: "danger",
      action: () => handleDeleteBookListing(bookId),
    });
  };

  // ⚠️ STATUS ALTERATION MODAL TRIGGER
  const triggerStatusWarning = (bookId, currentStatus, title) => {
    const nextState = currentStatus === "Active" ? "Draft" : "Active";
    setModalConfig({
      isOpen: true,
      title: `Switch Listing to ${nextState}?`,
      message: `Are you sure you want to alter "${title}" visibility to ${nextState}? Changing this state directly affects customer storefront searches.`,
      confirmText: `Apply ${nextState} Mode`,
      variant: "warning",
      action: () => handleUpdateBookStatus(bookId, currentStatus),
    });
  };

  if (isLoading) {
    return (
      <MiniLoader
        message="Loading inventory catalog"
        subMessage={`Syncing view layout items for page ${currentPage}...`}
        minHeight="min-h-[60vh]"
      />
    );
  }

  if (
    !books ||
    (books.length <= 0 &&
      currentPage === 1 &&
      searchTerm === "" &&
      statusFilter === "All")
  ) {
    return (
      <EmptyState
        title="You own zero listings."
        message="Start uploading assets to earn money."
        actionText="Create Listings"
        onAction={() => navigate("/seller/add-new-book")}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <SharedWarningModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.action}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        variant={modalConfig.variant}
      />

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Inventory
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Managing page {currentPage} of your digital catalog items
          </p>
        </div>
        <Link
          to="/seller/add-new-book"
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 cursor-pointer"
        >
          <Plus size={16} /> Add New Book
        </Link>
      </div>

      {/* FILTER & SEARCH ACTIONS PANEL */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SharedSearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative min-w-40">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-100 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
          >
            {filtersList.map((filter) => (
              <option key={filter.key} value={filter.key}>
                {filter.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            size={14}
          />
        </div>
      </div>

      {/* RENDER INVENTORY INTERACTIVE LIST DATA TABLE */}
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
                    key={book._id || book.id}
                    className="hover:bg-slate-50/30 transition-colors group animate-in fade-in duration-300"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-slate-100 rounded-xl shrink-0 border border-slate-200 flex items-center justify-center overflow-hidden">
                          {book.coverUrl ? (
                            <img
                              src={book.coverUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <BookOpen size={20} className="text-slate-300" />
                          )}
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
                            {book.status || "Active"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900">
                      $
                      {typeof book.price === "number"
                        ? book.price.toFixed(2)
                        : parseFloat(book.price || 0).toFixed(2)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${book.stock === 0 ? "text-danger" : "text-slate-600"}`}
                        >
                          {book.stock ?? 1}
                        </span>
                        {book.stock === 0 && (
                          <AlertCircle size={14} className="text-danger" />
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            triggerStatusWarning(
                              book._id,
                              book.status || "Active",
                              book.title,
                            )
                          }
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer"
                          title={
                            book.status === "Active"
                              ? "Switch to Draft Mode"
                              : "Switch to Active Live"
                          }
                        >
                          {book.status === "Active" ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/seller/edit-book/${book._id || book.id}`)
                          }
                          className="p-2 text-slate-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all cursor-pointer"
                          title="Edit Document Content Parameters"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            triggerDeleteWarning(
                              book._id || book.id,
                              book.title,
                            )
                          }
                          className="p-2 text-slate-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-all cursor-pointer"
                          title="Permanently Wipe Listing From Registry"
                        >
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
                        No listing objects match filter parameters on this page
                        slice
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("All");
                        }}
                        className="text-accent text-[10px] font-black uppercase tracking-widest mt-2 hover:underline cursor-pointer"
                      >
                        Reset Local Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SERVER PAGED CONTROLLER PANEL BAR */}
        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 border-t border-slate-50 bg-white">
            <p className="text-[11px] font-bold text-slate-400">
              Showing page <span className="text-slate-700">{currentPage}</span>{" "}
              of <span className="text-slate-700">{totalPages}</span> (
              {totalItems} records found)
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 border border-slate-100 rounded-xl text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .filter((pageNumber) => {
                  return (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - currentPage) <= 1
                  );
                })
                .map((pageNumber, i, filteredArray) => {
                  const showEllipsis =
                    i > 0 && pageNumber - filteredArray[i - 1] > 1;

                  return (
                    <React.Fragment key={pageNumber}>
                      {showEllipsis && (
                        <span className="text-xs font-bold text-slate-300 px-1">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                          currentPage === pageNumber
                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                            : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-100 rounded-xl text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
