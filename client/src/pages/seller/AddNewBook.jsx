import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  CloudUpload,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
  DollarSign,
  Tag,
  ChevronLeft,
  Plus,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { uploadFile } from "../../services/uploadService";
import { useAuth } from "../../context/public/AuthContext.jsx";
import { bookSchema } from "../../schemas/book.validation.js";
import { toast } from "react-toastify";
import { useSeller } from "../../context/SellerContext.jsx";

const categoriesList = [
  "Select Category",
  "Software Development",
  "UI/UX Design",
  "Business & Startup",
  "Education & Learning",
  "Health & Wellness",
  "Personal Development",
  "Finance & Investing",
  "Marketing & Sales",
  "Creative Arts",
  "Novels & Fiction",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Mystery & Thriller",
  "Biography & Memoir",
  "History & Politics",
  "Science & Technology",
  "Travel & Adventure",
  "Cooking & Food",
];

export default function AddNewBook() {
  // hooks
  const { user } = useAuth();
  const { handleBookUpload } = useSeller();
  const navigate = useNavigate();

  // States for File binaries, Cloud URLs, and Local Previews
  const [files, setFiles] = useState({ cover: null, asset: null });
  const [links, setLinks] = useState({ coverUrl: "", assetUrl: "" });
  const [previews, setPreviews] = useState({ cover: null, asset: null });
  const [uploadStates, setUploadStates] = useState({
    cover: "idle",
    asset: "idle",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  // Cleanup local object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previews.cover) URL.revokeObjectURL(previews.cover);
      if (previews.asset) URL.revokeObjectURL(previews.asset);
    };
  }, [previews]);

  // Logic to handle the Cloudinary upload
  const handleFileUpload = async (file, type) => {
    if (!file) return;

    // Duplication Check: skip if already successfully uploaded
    if (uploadStates[type] === "success" && links[`${type}Url`]) return;

    setUploadStates((prev) => ({ ...prev, [type]: "uploading" }));

    try {
      const folder = `sellers/${user.id}/${type === "cover" ? "covers" : "books"}`;
      const url = await uploadFile(file, folder);

      setLinks((prev) => ({ ...prev, [`${type}Url`]: url }));
      setUploadStates((prev) => ({ ...prev, [type]: "success" }));
    } catch (err) {
      console.error(`${type} upload failed:`, err);
      setUploadStates((prev) => ({ ...prev, [type]: "error" }));
    }
  };

  const onFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size for cost saving (e.g., 20MB limit)
    if (file.size > 20 * 1024 * 1024) {
      alert("File size exceeds 20MB. Please choose a smaller file.");
      return;
    }

    setFiles((prev) => ({ ...prev, [type]: file }));

    // Create immediate local preview
    const localUrl = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [type]: localUrl }));

    // Start upload
    handleFileUpload(file, type);
  };

  const onSubmit = async (data) => {
    if (uploadStates.cover !== "success" || uploadStates.asset !== "success") {
      alert(
        "Both cover and PDF must be uploaded successfully before publishing.",
      );
      return;
    }

    try {
      const finalBookPayload = {
        ...data,
        price: parseFloat(data.price),
        coverUrl: links.coverUrl,
        assetUrl: links.assetUrl,
        sellerId: user.id,
        createdAt: new Date().toISOString(),
      };

      await handleBookUpload(finalBookPayload);
    } catch (error) {
      console.error("Backend Error:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-6 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate(-1)}
          className="p-3.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl shadow-sm transition-all cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter">
            List New Asset
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Add digital files and marketplace details
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="space-y-10"
      >
        {/* ASSET PREVIEW & UPLOAD SECTION */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-8 ml-2">
            Phase 1: Binary Assets
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["cover", "asset"].map((type) => (
              <div key={type} className="group relative">
                <label
                  className={`relative border-2 border-dashed rounded-[2.5rem] p-4 flex flex-col items-center justify-center text-center transition-all h-87.5 overflow-hidden cursor-pointer
                  ${uploadStates[type] === "success" ? "border-emerald-100 bg-emerald-50/10" : "border-slate-100 bg-slate-50/30 hover:border-slate-300"}`}
                >
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => onFileSelect(e, type)}
                    accept={type === "cover" ? "image/*" : ".pdf"}
                  />

                  {/* LOADING OVERLAY */}
                  {uploadStates[type] === "uploading" && (
                    <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
                      <Loader2
                        size={32}
                        className="text-slate-900 animate-spin mb-4"
                      />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                        Verifying on Cloud
                      </p>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER */}
                  {previews[type] ? (
                    <div className="w-full h-full flex flex-col animate-in zoom-in-95 duration-500">
                      <div className="flex-1 w-full rounded-3xl border border-slate-200/60 bg-white shadow-inner overflow-hidden relative">
                        {type === "cover" ? (
                          <img
                            src={previews.cover}
                            alt="Preview"
                            className="w-full h-full object-contain p-4"
                          />
                        ) : (
                          <iframe
                            src={`${previews.asset}#toolbar=0&navpanes=0`}
                            className="w-full h-full border-none pointer-events-none scale-[1.01]"
                            title="PDF Preview"
                          />
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        {uploadStates[type] === "success" ? (
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            <CheckCircle size={14} /> Asset Live
                          </span>
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
                            Syncing...
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-10">
                      <div className="p-6 bg-white rounded-3xl shadow-sm mb-5 group-hover:scale-110 transition-transform">
                        {type === "cover" ? (
                          <CloudUpload size={32} className="text-slate-400" />
                        ) : (
                          <BookOpen size={32} className="text-slate-400" />
                        )}
                      </div>
                      <p className="text-sm font-black text-slate-800 tracking-tight capitalize">
                        Select {type}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">
                        {type === "cover"
                          ? "Thumbnail (JPG/PNG)"
                          : "Source (PDF)"}
                      </p>
                    </div>
                  )}

                  {/* ERROR OVERLAY */}
                  {uploadStates[type] === "error" && (
                    <div className="absolute inset-0 z-30 bg-white flex flex-col items-center justify-center animate-in slide-in-from-bottom-5">
                      <XCircle size={36} className="text-danger mb-3" />
                      <p className="text-[11px] font-black uppercase text-danger tracking-widest mb-4">
                        Cloud Error
                      </p>
                      <button
                        type="button"
                        onClick={() => handleFileUpload(files[type], type)}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all"
                      >
                        <RotateCcw size={14} /> Retry Sync
                      </button>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* METADATA FORM SECTION */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8">
          <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2">
            Phase 2: Metadata
          </h3>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">
              Listing Title
            </label>
            <input
              {...register("title")}
              placeholder="e.g. Advanced TypeScript for MERN"
              className={`w-full bg-slate-50/50 border border-transparent rounded-[1.25rem] px-8 py-5 text-sm font-bold text-slate-800 outline-none transition-all focus:bg-white focus:border-slate-200 focus:ring-[6px] focus:ring-slate-100/50 ${errors.title ? "ring-2 ring-danger/20" : ""}`}
            />
            {errors.title && (
              <p className="text-[10px] text-danger font-black uppercase mt-2 ml-2 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">
                Price (USD)
              </label>
              <div className="relative group">
                <DollarSign
                  size={20}
                  className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors"
                />
                <input
                  {...register("price")}
                  type="number"
                  step="0.01"
                  className="w-full bg-slate-50/50 border border-transparent rounded-[1.25rem] pl-14 pr-8 py-5 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-200 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">
                Category
              </label>
              <div className="relative">
                <Tag
                  size={20}
                  className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                />
                <select
                  {...register("category")}
                  className="w-full bg-slate-50/50 border border-transparent rounded-[1.25rem] pl-14 pr-8 py-5 text-sm font-bold text-slate-800 outline-none appearance-none cursor-pointer focus:bg-white focus:border-slate-200 transition-all"
                >
                  {categoriesList.map((cat) => (
                    <option
                      key={cat}
                      value={cat === "Select Category" ? "" : cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-2">
              Short Synopsis
            </label>
            <textarea
              {...register("description")}
              rows="6"
              className="w-full bg-slate-50/50 border border-transparent rounded-4xl px-8 py-6 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-200 transition-all resize-none"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-8 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-slate-900 transition-all"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              uploadStates.cover !== "success" ||
              uploadStates.asset !== "success"
            }
            className="w-full sm:w-auto flex items-center justify-center gap-4 bg-slate-900 text-white px-16 py-5 rounded-1.3xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Finalizing
                Listing...
              </>
            ) : (
              <>
                <Plus size={18} strokeWidth={4} /> Publish To Marketplace
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
