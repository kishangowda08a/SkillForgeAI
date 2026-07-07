// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      
      {/* 1. PERMANENT LEFT SIDEBAR */}
      <Sidebar />

      {/* 2. RIGHT SIDE CONTAINER (Splits vertically into Top Utility, Content, and Footer) */}
      <div className="flex-1 h-full flex flex-col overflow-hidden relative">
        
        {/* 🟩 TOP RIGHT LOGOUT BAR */}
        <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-3 flex justify-end items-center z-20 shrink-0">
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </header>

        {/* 🟢 CENTER VIEWPORT: DYNAMIC ROUTE SCROLL LAYER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>

        {/* 🟦 BOTTOM FOOTER SECTION */}
        <footer className="w-full bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-500 font-medium tracking-wide shrink-0">
          &copy; {new Date().getFullYear()} SkillForge AI. All rights reserved.
        </footer>

      </div>
    </div>
  );
}

export default Layout;