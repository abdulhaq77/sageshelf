// pages/seller/SellerAnalytics.jsx
import React from "react";
import {
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Download,
  MousePointer2,
  ShoppingBag,
  Star,
} from "lucide-react";

export default function SellerAnalytics() {
  const performanceKpis = [
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+0.4%",
      icon: <MousePointer2 size={18} />,
    },
    {
      label: "Avg. Order Value",
      value: "$42.50",
      change: "-1.2%",
      icon: <ShoppingBag size={18} />,
    },
    {
      label: "Customer Satisfaction",
      value: "4.92/5",
      change: "+0.1%",
      icon: <Star size={18} />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* --- TOP BAR: Header & Date Range --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Deep dive into your store performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
            <Calendar size={14} className="text-accent" /> Last 30 Days
          </div>
          <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 cursor-pointer">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* --- SECTION 1: MAIN REVENUE CHART --- */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Revenue
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              $45,280.00
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-xl">
            <TrendingUp size={16} />
            <span className="text-xs font-black">+18.5% vs last month</span>
          </div>
        </div>

        {/* MOCK CHART AREA: In a real app, use <ResponsiveContainer> from Recharts */}
        <div className="h-64 w-full bg-slate-50/50 rounded-3xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
          {/* Visual placeholder for bar chart peaks */}
          {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85, 30, 75].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-accent/20 hover:bg-accent rounded-t-lg transition-all duration-500 group relative"
              style={{ height: `${height}%` }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                ${(height * 100).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 px-2">
          {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((month) => (
            <span
              key={month}
              className="text-[10px] font-bold text-slate-300 uppercase tracking-widest"
            >
              {month}
            </span>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: KPI MINI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceKpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-5"
          >
            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center border border-slate-100">
              {kpi.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {kpi.label}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <h4 className="text-lg font-black text-slate-900">
                  {kpi.value}
                </h4>
                <span
                  className={`text-[10px] font-black ${kpi.change.startsWith("+") ? "text-success" : "text-danger"}`}
                >
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECTION 3: TOP PERFORMING BOOKS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
            Top Sellers
          </h3>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs border border-slate-100">
                    #{item}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      React for Seniors
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      248 Sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">$5,952</p>
                  <p className="text-[10px] font-bold text-success uppercase">
                    Growth +12%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between">
          {/* Abstract Background Decoration */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

          <div>
            <h3 className="text-lg font-black tracking-tight leading-tight">
              Ready to boost your
              <br />
              sales by 20%?
            </h3>
            <p className="text-white/60 text-xs mt-2 leading-relaxed max-w-50">
              Our smart AI analyzed your store and found 3 pricing
              optimizations.
            </p>
          </div>

          <button className="mt-8 bg-accent text-white py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 w-fit">
            View Insights <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
