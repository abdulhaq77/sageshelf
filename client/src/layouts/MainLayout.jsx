import { AuthProvider } from "../context/public/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-950 selection:bg-emerald-500/30 selection:text-emerald-400 antialiased">
      {/* Ambient background glow accent - subtle premium touches for recruiters */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-linear-to-b from-emerald-500/3 to-transparent pointer-events-none z-0 blur-3xl" />

      {/* Persistent SaaS Navigation Header */}
      <Navbar />

      {/* Main content view layer wrapper */}
      <main className="grow relative z-10 bg-white rounded-t-[2.5rem] lg:rounded-t-[3.5rem] shadow-2xl shadow-slate-950/50 border-t border-slate-900/10">
        <Outlet />
      </main>

      {/* Persistent Site Footer Component */}
      <Footer />
    </div>
  );
}
