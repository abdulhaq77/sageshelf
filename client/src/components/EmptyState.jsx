// components/common/EmptyState.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { OctagonAlert, ArrowLeft, Plus } from "lucide-react";

export default function EmptyState({
  title,
  message,
  actionText,
  onAction,
  showBackButton = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center animate-in fade-in zoom-in duration-300">
      {/* Icon Container */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
        <OctagonAlert className="h-10 w-10 text-slate-400" />
      </div>

      {/* Text Content */}
      <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>
      <p className="mb-8 max-w-75 text-sm text-slate-500 leading-relaxed">
        {message}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        )}

        {actionText && (
          <button
            onClick={onAction}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
