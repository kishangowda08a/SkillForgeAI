import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/95 border-b border-white/10 shadow-xl text-white">
      <div className="w-full px-8 py-4 flex justify-between items-center mx-auto">
        
        {/* Brand Identity / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
            🚀
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide leading-none">
              SkillForge AI
            </h1>
            <p className="text-[10px] text-gray-400 mt-1">
              AI Career Platform
            </p>
          </div>
        </div>

        {/* Action Controls / Right-aligned Utilities */}
        <div className="flex items-center gap-6">
          
          {/* User Profile Summary */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm shadow">
              K
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold leading-none">
                Kishan
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Student
              </p>
            </div>
          </div>

          {/* Separation Line */}
          <div className="h-6 w-[1px] bg-white/10"></div>

          {/* Session Termination Trigger */}
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-pink-600 px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;