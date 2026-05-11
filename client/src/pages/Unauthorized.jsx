import React from "react";
import { ShieldAlert, ArrowLeft, Home, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Visual Icon Stack */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-500 relative z-10">
            <ShieldAlert className="w-12 h-12" />
          </div>
          {/* Decorative background pulse */}
          <div className="absolute inset-0 bg-red-100 rounded-[2.5rem] animate-ping opacity-20 scale-75"></div>
          <div className="absolute -top-4 -right-4 text-[#a3b18a] opacity-20 rotate-12">
            <LockKeyhole className="w-12 h-12" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 italic">
          Access <span className="text-red-500">Denied</span>.
        </h1>

        <p className="text-slate-500 leading-relaxed mb-10 text-sm">
          You have reached a restricted section of the archive. Your current
          account role does not have the necessary clearance to view this
          knowledge shelf.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Link>

          <Link
            to="/"
            className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>

        {/* Support Footer */}
        <p className="mt-12 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Need help?{" "}
          <Link to="/contact" className="text-[#a3b18a] hover:underline">
            Contact Archive Support
          </Link>
        </p>
      </div>
    </div>
  );
}
