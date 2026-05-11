// pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  CheckCircle2,
  History,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import EmptyState from "../../components/EmptyState";
import MiniLoader from "../../components/spinners/MiniLoader.jsx";

export default function BuyerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // dummy orders
  const dummyOrders = [
    {
      _id: "65f2a1b2e4b0a1a2b3c4d5e1",
      createdAt: "2026-05-10T14:30:00.000Z",
      status: "Completed",
      totalAmount: 18.5,
      items: [{ bookTitle: "The Midnight Library", format: "PDF" }],
      paymentMethod: "Stripe/Credit Card",
    },
    {
      _id: "65f2a1b2e4b0a1a2b3c4d5e2",
      createdAt: "2026-04-15T09:15:00.000Z",
      status: "Completed",
      totalAmount: 45.98,
      items: [
        { bookTitle: "Project Hail Mary", format: "EPUB" },
        { bookTitle: "Atomic Habits", format: "PDF" },
      ],
      paymentMethod: "PayPal",
    },
  ];

  // Fetch Real Data from MongoDB
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersList = await setTimeout(() => {
          return dummyOrders;
        }, 1000);
        setOrders(ordersList);
      } catch (err) {
        setError("Failed to load purchase history. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
        <MiniLoader size="lg" message="Retrieving your digital licenses..." />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto text-danger mb-4" size={40} />
        <p className="text-slate-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-accent font-bold underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <EmptyState
          title="No purchase history"
          message="You haven't purchased any digital books yet. Your receipts and invoices will appear here."
          Icon={History}
          actionText="Start Shopping"
          onAction={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Purchase History</h1>
        <p className="text-sm text-slate-500">
          Manage your digital receipts and access your downloads.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="group border rounded-2xl bg-white shadow-sm hover:border-accent/30 hover:shadow-md transition-all duration-300"
          >
            {/* Order Header */}
            <div className="bg-slate-50/80 px-6 py-4 flex flex-wrap justify-between items-center border-b rounded-t-2xl gap-4">
              <div className="flex gap-8 md:gap-12">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Total Paid
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Invoice ID
                  </p>
                  <p className="text-xs font-mono text-slate-500 uppercase">
                    {order._id.slice(-8)}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white border rounded-lg hover:bg-slate-100 transition-colors">
                <FileText size={14} className="text-slate-400" /> Receipt PDF
              </button>
            </div>

            {/* Order Body */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Payment {order.status}
                  </h4>
                  <div className="mt-1 space-y-1">
                    {order.items.map((item, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-slate-500 font-medium italic"
                      >
                        "{item.bookTitle}"
                      </p>
                    ))}
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase">
                    Digital Access: Permanent
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-35">
                <button
                  onClick={() => navigate("/buyer/library")}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-primary/10"
                >
                  Read Now <ArrowRight size={14} />
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  <Download size={14} /> Download File
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Footnote */}
      <div className="mt-10 p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <p className="text-[11px] text-accent font-medium">
          License recovery is automatic. Your books are tied to your account
          permanently.
        </p>
      </div>
    </div>
  );
}
