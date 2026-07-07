import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  // State to manage sidebar open/collapsed status
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Resume Builder", path: "/resume-builder", icon: "📄" },
    { name: "Resume Analyzer", path: "/resume-analyzer", icon: "📊" },
    { name: "Interview Generator", path: "/interview-generator", icon: "🎤" },
    { name: "Resume Roadmap", path: "/resume-roadmap", icon: "🗺️" },
    { name: "Job Matcher", path: "/job-matcher", icon: "💼" },
    { name: "Cover Letter", path: "/cover-letter", icon: "✉️" },
    { name: "My Roadmaps", path: "/my-roadmaps", icon: "📚" },
    { name: "My Resumes", path: "/my-resumes", icon: "📝" },
    { name: "Profile", path: "/profile", icon: "👤" }
  ];

  return (
    <aside 
      className={`h-screen sticky top-0 bg-slate-950 text-white flex flex-col shadow-2xl transition-all duration-300 relative shrink-0
        ${isOpen ? "w-72" : "w-20"}`}
    >
      {/* Toggle Arrow Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-500 border border-white/20 flex items-center justify-center text-xs text-white shadow-md z-50 transition-transform duration-300"
        title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        <span className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}>
          ◀
        </span>
      </button>

      {/* Logo Section */}
    {/* 🟩 Update the Logo Section to this: */}
<Link 
  to="/dashboard" 
  className={`p-6 border-b border-white/10 flex items-center hover:bg-white/5 transition-colors ${isOpen ? "gap-4" : "justify-center"}`}
>
  <div className="w-12 h-12 min-w-[48px] rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shrink-0">
    🚀
  </div>
  {isOpen && (
    <div className="overflow-hidden whitespace-nowrap animate-fadeIn">
      <h1 className="text-xl font-bold">SkillForge AI</h1>
      <p className="text-gray-400 text-xs">AI Career Platform</p>
    </div>
  )}
</Link>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 token-sidebar-scroll">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={!isOpen ? item.name : undefined}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isOpen ? "" : "justify-center"}
                ${isActive 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg" 
                  : "hover:bg-white/10 text-gray-300"
                }`}
            >
              <span className={`text-2xl transition-transform duration-300 ${!isOpen && "group-hover:scale-110"}`}>
                {item.icon}
              </span>
              
              {isOpen && (
                <span className="font-semibold overflow-hidden whitespace-nowrap animate-fadeIn">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className={`border-t border-white/10 p-5 flex items-center ${isOpen ? "gap-4" : "justify-center"}`}>
        <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
          K
        </div>
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap animate-fadeIn">
            <h3 className="font-bold text-sm">Kishan</h3>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;