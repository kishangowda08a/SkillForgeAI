import { useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../services/api";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {

    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setAnalysis(res.data.analysis);

    } catch (error) {

      console.log(error);

      alert("Resume analysis failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Resume Analyzer
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />

        <br />

        <button
          onClick={analyzeResume}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Analyze Resume
        </button>

        {loading && (
          <p className="mt-4">
            Analyzing Resume...
          </p>
        )}

        {analysis && (
          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-4">
              Analysis Result
            </h2>

           <div className="bg-gray-100 p-6 rounded-lg shadow mt-4">
  <ReactMarkdown>
    {analysis}
  </ReactMarkdown>
</div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ResumeAnalyzer;