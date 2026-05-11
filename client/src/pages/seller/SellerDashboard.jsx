import React from "react";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";

export default function SellerDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$1,240.00",
      icon: <DollarSign />,
      color: "text-green-600",
    },
    {
      label: "Active Listings",
      value: "14",
      icon: <Package />,
      color: "text-[#a3b18a]",
    },
    {
      label: "Total Customers",
      value: "84",
      icon: <Users />,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
          Seller Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Overview of your SageShelf sales and performance.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div
              className={`p-3 w-fit rounded-2xl bg-slate-50 mb-4 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Sales Chart Placeholder */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            Sales Analytics Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
