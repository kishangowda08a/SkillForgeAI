import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";

import API from "../services/api";

function JobMatcher() {

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const analyzeMatch = async () => {

    if (
      !jobTitle ||
      !jobDescription ||
      !resume
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobTitle", jobTitle);
      formData.append("company", company);
      formData.append("jobDescription", jobDescription);

      const res = await API.post(
        "/jobmatcher/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(res.data.matchResult);

    } catch (err) {

      console.log(err);

      alert("Analysis Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
            AI Job Matcher
          </h1>

          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e)=>setJobTitle(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            placeholder="Company (Optional)"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            rows="10"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e)=>setJobDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e)=>setResume(e.target.files[0])}
            className="mb-6"
          />

          <button
            onClick={analyzeMatch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Analyze Match
          </button>

          {loading && (
            <p className="mt-6">
              Analyzing Resume...
            </p>
          )}

        </div>

        {result && (

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Match Report
            </h2>

            <article className="prose prose-lg max-w-none">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {result}
              </ReactMarkdown>

            </article>

          </div>

        )}

      </div>

    </div>

  );

}

export default JobMatcher;