import { useState } from "react";
import API from "../services/api";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";

function ResumeRoadmap() {

  const [file, setFile] = useState(null);
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {

    if (!file) {
      alert("Please upload your resume.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/resume-roadmap/generate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setRoadmap(res.data.roadmap);

    } catch (err) {

      console.log(err);
      alert("Failed to generate roadmap");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
            Resume Based Roadmap
          </h1>

          <input
            type="file"
            accept=".pdf"
            onChange={(e)=>setFile(e.target.files[0])}
            className="mb-6"
          />

          <br/>

          <button
            onClick={generateRoadmap}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Generate Personalized Roadmap
          </button>

          {loading && (

            <p className="mt-6 text-lg">
              Generating Roadmap...
            </p>

          )}

        </div>

        {roadmap && (

          <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-blue-700 mb-8">
              Your Personalized Roadmap
            </h2>

            <article className="prose prose-lg max-w-none">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {roadmap}
              </ReactMarkdown>

            </article>

          </div>

        )}

      </div>

    </div>

  );

}

export default ResumeRoadmap;