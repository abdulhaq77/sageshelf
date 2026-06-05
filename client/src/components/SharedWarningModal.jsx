import React from "react";
import { AlertCircle, X } from "lucide-react";

export default function SharedWarningModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm Action",
  variant = "danger", // 'danger' for deletion, 'warning' for state edits
}) {
  if (!isOpen) return null;

  const accentStyles =
    variant === "danger"
      ? {
          bg: "bg-danger/10",
          text: "text-danger",
          btn: "bg-danger hover:bg-danger/90 shadow-danger/20",
        }
      : {
          bg: "bg-warning/10",
          text: "text-warning",
          btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20",
        };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Warning Icon Banner */}
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl shrink-0 ${accentStyles.bg} ${accentStyles.text}`}
          >
            <AlertCircle size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all cursor-pointer ${accentStyles.btn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
