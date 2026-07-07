import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import API from "../services/api";

function CoverLetterGenerator() {

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {

    if (!jobTitle || !company || !jobDescription || !resume) {
      alert("Please fill all fields and upload your resume.");
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
        "/coverletter/generate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setCoverLetter(res.data.coverLetter);

    } catch (err) {

      console.log(err);

      alert("Failed to generate cover letter.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
            AI Cover Letter Generator
          </h1>

          <input
            type="text"
            placeholder="Job Title"
            className="w-full border rounded-lg p-3 mb-4"
            value={jobTitle}
            onChange={(e)=>setJobTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company Name"
            className="w-full border rounded-lg p-3 mb-4"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
          />

          <textarea
            rows="8"
            placeholder="Paste Job Description"
            className="w-full border rounded-lg p-3 mb-4"
            value={jobDescription}
            onChange={(e)=>setJobDescription(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            className="mb-6"
            onChange={(e)=>setResume(e.target.files[0])}
          />

          <button
            onClick={generateCoverLetter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Generate Cover Letter
          </button>

          {loading && (
            <p className="mt-6">
              Generating...
            </p>
          )}

        </div>

        {coverLetter && (

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Generated Cover Letter
            </h2>

            <article className="prose prose-lg max-w-none">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {coverLetter}
              </ReactMarkdown>

            </article>

          </div>

        )}

      </div>

    </div>

  );

}

export default CoverLetterGenerator;