// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword"; // 🟩 1. IMPORT YOUR NEW PAGE
import Dashboard from "./pages/Dashboard";
import MyRoadmaps from "./pages/MyRoadmaps";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewGenerator from "./pages/InterviewGenerator";
import Profile from "./pages/Profile"; 
import ResumeRoadmap from "./pages/ResumeRoadmap";
import JobMatcher from "./pages/JobMatcher";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import ResumeBuilder from "./pages/ResumeBuilder";
import MyResumes from "./pages/MyResumes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟡 PUBLIC ROUTES (No Sidebar, Accessible to Everyone) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* 🟩 2. ADD THE ROUTE HERE */}

        {/* 🟢 PROTECTED APP ROUTES (Requires Auth + Layout Wrapper) */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-roadmaps" element={<MyRoadmaps />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/interview-generator" element={<InterviewGenerator />} />
          <Route path="/resume-roadmap" element={<ResumeRoadmap />} />
          <Route path="/job-matcher" element={<JobMatcher />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-builder/:id" element={<ResumeBuilder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-resumes" element={<MyResumes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;