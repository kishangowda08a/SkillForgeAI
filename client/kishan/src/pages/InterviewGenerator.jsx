import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";
import API from "../services/api";



function InterviewGenerator() {

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);



const generateInterview = async () => {

  if (!role || !experience || !difficulty) {
    alert("Please fill all the fields.");
    return;
  }

  console.log({
    role,
    experience,
    difficulty
  });

  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await API.post(
      "/interview/generate",
      {
        role,
        experience,
        difficulty
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setQuestions(res.data.questions);

  } catch (error) {

    console.log(error);
    alert("Failed to generate interview questions");

  } finally {

    setLoading(false);

  }
};
  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
             AI Interview Generator
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <input
              type="text"
              placeholder="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg p-3"
            />

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">Experience</option>
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

          <button
            onClick={generateInterview}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Generate Interview Questions
          </button>

          {loading && (
            <p className="mt-6">
              Generating Questions...
            </p>
          )}

        </div>

        {questions && (

          <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              📋 Interview Questions
            </h2>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

  <h2 className="text-3xl font-bold text-blue-700 mb-8">
    💼 AI Interview Questions
  </h2>

  <article className="prose prose-blue prose-lg max-w-none">

    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {questions}
    </ReactMarkdown>

  </article>

</div>

          </div>

        )}

      </div>

    </div>

  );
}

export default InterviewGenerator;