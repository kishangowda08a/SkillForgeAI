import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import API from "../services/api";

function Dashboard() {
  const [career, setCareer] = useState("");
  const [level, setLevel] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateRoadmap = async () => {
    if (!career || !level) {
      alert("Please enter Career Goal and Level.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/ai/roadmap",
        { career, level },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRoadmap(res.data.roadmap.roadmap);
    } catch (error) {
      console.log(error);
      alert("Failed to generate roadmap");
    }
  };

  return (
    /* Main scroll container filling up the space right next to your sidebar */
    <div className="w-full h-full overflow-y-auto p-6 md:p-8 bg-gray-100">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-2xl mb-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <p className="uppercase tracking-[4px] text-blue-200 font-semibold">
            AI Career Platform
          </p>
          <h1 className="text-5xl font-extrabold mt-3 leading-tight">
            Welcome back, <span className="text-yellow-300">{profile?.name || "User"}</span> 👋
          </h1>
          <p className="mt-5 text-lg text-blue-100 max-w-3xl leading-relaxed">
            Build ATS-friendly resumes, generate AI interview questions,
            create career roadmaps, analyze resumes, write cover letters,
            and match your resume with jobs — all in one platform.
          </p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {/* Roadmaps */}
        <div className="group bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Career Roadmaps</p>
              <h2 className="text-5xl font-extrabold mt-3">{profile?.roadmaps || 0}</h2>
            </div>
            <div className="text-6xl opacity-80">🗺️</div>
          </div>
        </div>

        {/* Interviews */}
        <div className="group bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100">Interview Sets</p>
              <h2 className="text-5xl font-extrabold mt-3">{profile?.interviews || 0}</h2>
            </div>
            <div className="text-6xl">🎤</div>
          </div>
        </div>

        {/* Resume Analyses */}
        <div className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100">Resume Analyses</p>
              <h2 className="text-5xl font-extrabold mt-3">{profile?.resumes || 0}</h2>
            </div>
            <div className="text-6xl">📄</div>
          </div>
        </div>

        {/* AI Requests */}
        <div className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-100">AI Requests</p>
              <h2 className="text-5xl font-extrabold mt-3">{profile?.totalAIRequests || 0}</h2>
            </div>
            <div className="text-6xl">🤖</div>
          </div>
        </div>

        {/* Account Age */}
        <div className="group bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-indigo-100">Account Age</p>
              <h2 className="text-5xl font-extrabold mt-3">{profile?.accountAge || 0} Days</h2>
            </div>
            <div className="text-6xl">📅</div>
          </div>
        </div>

        {/* Status */}
        <div className="group bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-teal-100">Status</p>
              <h2 className="text-3xl font-bold mt-4">Active</h2>
            </div>
            <div className="text-6xl">✅</div>
          </div>
        </div>
      </div>

      {/* 🟩 ROADMAP GENERATOR INPUT PANEL (FIXED & RESTORED) */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Generate Career Roadmap
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Tell us your goals, and our AI will build a step-by-step path to master them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Career Goal</label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full p-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Experience Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 transition"
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateRoadmap}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition active:scale-[0.99]"
        >
          Generate Custom Roadmap
        </button>
      </div>

      {/* AI Roadmap Presentation Result Output */}
      {roadmap && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12 animate-fadeIn">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Generated Career Roadmap
          </h2>
          <div className="prose prose-lg max-w-none text-gray-800">
            <ReactMarkdown>
              {roadmap}
            </ReactMarkdown>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;