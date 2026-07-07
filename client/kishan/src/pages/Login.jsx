import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 text-gray-900 overflow-hidden">
      
      {/* LEFT SIDE: PRODUCT SHOWCASE BRANDING (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-12 flex-col justify-between text-white overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Top Header Identity */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
            🚀
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-wide">SkillForge AI</h2>
            <p className="text-[10px] text-gray-400">AI Career Platform</p>
          </div>
        </div>

        {/* Center Marketing Hook */}
        <div className="relative z-10 max-w-md my-auto">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-4">
            Forge Your Perfect <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Career Path with AI
            </span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            Build premium ATS-optimized resumes, simulate targeted AI technical interviews, and outline immediate roadmap execution steps tailored directly to your engineering goals.
          </p>

          {/* Micro Feature Indicators */}
          <div className="space-y-3.5">
            {[
              { label: "AI Resume Optimization & Analysis", icon: "📄" },
              { label: "Interactive Mock Technical Interviews", icon: "🎤" },
              { label: "Dynamic Step-by-Step Goal Roadmaps", icon: "🗺️" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-300">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Platform Footer Details */}
        <div className="text-xs text-gray-500 relative z-10">
          &copy; {new Date().getFullYear()} SkillForge AI. Empowering engineered builders globally.
        </div>
      </div>

      {/* RIGHT SIDE: INTERACTIVE INTERFACES / AUTH FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md flex flex-col">
          
          {/* Mobile Identity Viewport Header */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-lg text-white shadow-md">
              🚀
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-wide">SkillForge AI</h2>
          </div>

          {/* Form Explainer Headings */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1.5">
              Enter your credentials below to return to your workspace profile context.
            </p>
          </div>

          {/* Error Prompt Message Window */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl mb-6 flex items-center gap-3 font-medium animate-fadeIn">
              ⚠️ <span>{error}</span>
            </div>
          )}

          {/* Login Capture Form Submission Element */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. kishangowda@gmail.com"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 bg-gray-50/50 transition duration-200 text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Password
                </label>
                {/* 🟩 CHANGED HERE: Updated to a real router link to point to your new page */}
                <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 bg-gray-50/50 transition duration-200 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                "Sign In to Workspace"
              )}
            </button>
          </form>

          {/* Registration Helper Redirection Anchor */}
          <p className="text-sm text-gray-500 mt-8 text-center">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create an account free
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;