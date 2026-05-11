import React, { useState } from "react";
import {
  X,
  CreditCard,
  ShieldCheck,
  Lock,
  Wallet,
  CheckCircle2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
// import { useSearchParams } from "react-router-dom";

export default function CheckoutDrawer({ isOpen, onClose }) {
  //   const { id } = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Mock data for the order summary
  const cartItems = [
    {
      id: 1,
      title: "Modern React Patterns",
      price: 1200,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=200",
    },
    {
      id: 4,
      title: "UI Design 2026",
      price: 1200,
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=200",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const digitalFee = 150;
  const total = subtotal + digitalFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* --- BLUR BACKDROP --- */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* --- VERTICAL DRAWER RECTANGLE --- */}
      <div className="relative w-full max-w-120 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase italic">
              SAGE<span className="text-[#a3b18a]">SHELF</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Secure Checkout
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
          {/* Order Review */}
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Your Selection
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all"
                >
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-black text-[#a3b18a]">
                      PKR {item.price.toLocaleString()}
                    </p>
                  </div>
                  <button className="self-center p-2 text-slate-300 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Details */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Payment Details
            </h3>

            <div className="flex gap-3">
              {["card", "wallet"].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all ${
                    paymentMethod === m
                      ? "border-[#a3b18a] bg-[#a3b18a]/5 text-[#a3b18a]"
                      : "border-slate-100 text-slate-400 text-[10px] font-black uppercase"
                  }`}
                >
                  {m === "card" ? (
                    <CreditCard size={16} />
                  ) : (
                    <Wallet size={16} />
                  )}
                  {m}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full h-12 px-5 rounded-xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-[#a3b18a]/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="h-12 px-5 rounded-xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="h-12 px-5 rounded-xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Total Summary */}
          <section className="p-6 rounded-4xl bg-slate-900 text-white">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[10px] font-bold opacity-50 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold opacity-50 uppercase tracking-widest">
                <span>Digital Fee</span>
                <span>PKR {digitalFee}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/10">
                <span className="text-xs font-black text-[#a3b18a] uppercase italic">
                  Total
                </span>
                <span className="text-2xl font-black tracking-tighter">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full bg-[#a3b18a] hover:bg-[#94a17a] h-14 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
              Confirm & Pay <ShieldCheck size={18} />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
              <Lock size={10} />
              <span className="text-[8px] font-black uppercase tracking-widest">
                Secure Checkout
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
