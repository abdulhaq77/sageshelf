import { ShoppingCart, Trash2, ShieldCheck, CreditCard } from "lucide-react";
import EmptyState from "../components/EmptyState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const initialCart = [
    {
      id: "b2",
      title: "Atomic Habits",
      author: "James Clear",
      price: 22.0,
      image: "...",
      quantity: 1,
    },
    {
      id: "b4",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 14.95,
      image: "...",
      quantity: 2,
    },
  ];

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is ready for a refill"
        message="Ready to check out? Add books here."
        Icon={ShoppingCart}
        actionText={`Browse Books`}
        onAction={() => navigate(`/categories`)}
      />
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* 1. Transactional List */}
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-6">
          Shopping Cart ({cartItems.length})
        </h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-xl bg-white items-center"
            >
              <img
                src={item.image}
                className="w-20 h-24 object-cover rounded-md bg-slate-100"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500">In Stock</p>
                <button className="mt-2 text-xs text-red-500 flex items-center gap-1 hover:underline">
                  <Trash2 size={12} /> Remove
                </button>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${item.price}</p>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-12 border rounded p-1 text-center text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Purchasing Pathway (Sticky Summary) */}
      <div className="lg:col-span-1">
        <div className="bg-slate-50 p-6 rounded-2xl border sticky top-24">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-slate-600 border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <CreditCard size={18} /> Checkout Now
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} /> Secure Checkout Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
}
