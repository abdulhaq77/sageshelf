import React from "react";
import {
  TrendingUp,
  BookOpen,
  Users,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

export default function SellerDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$12,840",
      growth: "+12%",
      icon: <DollarSign size={20} />,
      color: "bg-emerald-500",
    },
    {
      label: "Books Sold",
      value: "856",
      growth: "+5.4%",
      icon: <BookOpen size={20} />,
      color: "bg-accent",
    },
    {
      label: "Active Customers",
      value: "1,204",
      growth: "+2.1%",
      icon: <Users size={20} />,
      color: "bg-purple-500",
    },
    {
      label: "Avg. Rating",
      value: "4.8",
      growth: "+0.3%",
      icon: <TrendingUp size={20} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* --- SECTION 1: STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-${stat.color.split("-")[1]}-500/20`}
              >
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded-lg">
                {stat.growth} <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* --- SECTION 2: RECENT SALES TABLE --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-slate-900">Recent Sales</h3>
            <p className="text-xs text-slate-400 font-medium">
              You made 12 sales today
            </p>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreHorizontal size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Book Details
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Customer
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Date
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Amount
                </th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  key={item}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-12 bg-slate-100 rounded-lg shrink-0 border border-slate-200 group-hover:scale-105 transition-transform" />
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          The Modern React Guide
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          E-Book (PDF)
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">
                    alex.dev@example.com
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-400">
                    May 12, 2026
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">
                    $24.00
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black rounded-full uppercase tracking-tighter">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-accent hover:underline cursor-pointer">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
