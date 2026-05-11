// pages/admin/UploadBook.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "../../schemas/bookSchema";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Upload,
  FileText,
  ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function UploadBook() {
  const { showLoader, hideLoader } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: { category: "Programming", format: "PDF" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchCover = watch("coverImage");
  const watchFile = watch("bookFile");

  const onSubmit = async (data) => {
    showLoader("Validating and publishing...");
    const formData = new FormData();

    // Append all text fields
    Object.keys(data).forEach((key) => {
      if (key !== "coverImage" && key !== "bookFile") {
        formData.append(key, data[key]);
      }
    });

    // Append Files
    formData.append("coverImage", data.coverImage[0]);
    formData.append("bookFile", data.bookFile[0]);

    try {
      await api.post("/books/upload", formData);
      alert("Book successfully added to store!");
    } catch (err) {
      console.error(err);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
              Book Title
            </label>
            <input
              {...register("title")}
              className={`p-3 bg-slate-50 rounded-lg outline-none border ${errors.title ? "border-danger/50" : "border-transparent focus:ring-2 focus:ring-accent"}`}
            />
            {errors.title && (
              <span className="text-[10px] text-danger flex items-center gap-1">
                <AlertCircle size={10} /> {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Author and Price Inputs with same error pattern */}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-slate-400">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="5"
              className="p-3 bg-slate-50 rounded-lg resize-none outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.description && (
              <span className="text-[10px] text-danger">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        {/* Sidebar: Files & Action */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-3">
              Assets
            </p>

            {/* Cover Dropzone */}
            <div
              className={`relative h-28 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${errors.coverImage ? "border-danger/30 bg-danger/5" : "border-slate-200 hover:border-accent"}`}
            >
              <input
                type="file"
                {...register("coverImage")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {watchCover?.[0] ? (
                <CheckCircle className="text-success" />
              ) : (
                <ImageIcon className="text-slate-300" />
              )}
              <p className="text-[10px] mt-2 text-slate-500 truncate max-w-37.5">
                {watchCover?.[0] ? watchCover[0].name : "Cover Image"}
              </p>
            </div>
            {errors.coverImage && (
              <p className="text-[9px] text-danger mt-1 text-center font-bold">
                {errors.coverImage.message}
              </p>
            )}

            {/* Book File Dropzone follows same pattern */}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            <Upload size={18} /> Publish to Store
          </button>
        </div>
      </form>
    </div>
  );
}
