import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import API from "../services/api";

function MyInterviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/interview", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setInterviews(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  const deleteInterview = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/interview/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchInterviews();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          My Interviews
        </h1>

        {interviews.length === 0 ? (

          <div className="bg-white rounded-xl p-10 shadow text-center">
            No Interview Sets Found
          </div>

        ) : (

          interviews.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.role}
                  </h2>

                  <p className="text-gray-500">
                    {item.experience} • {item.difficulty}
                  </p>

                </div>

                <button
                  onClick={() => deleteInterview(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

              <hr className="my-6"/>

              <article className="prose prose-lg max-w-none">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {item.questions}
                </ReactMarkdown>

              </article>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default MyInterviews;