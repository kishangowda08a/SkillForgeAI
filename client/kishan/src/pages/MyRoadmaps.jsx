import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../services/api";

function MyRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/ai/roadmaps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoadmaps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoadmap = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/ai/roadmap/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (selectedRoadmap?._id === id) {
        setSelectedRoadmap(null);
      }

      fetchRoadmaps();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-blue-700">
            📚 My Learning Roadmaps
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all your AI-generated career roadmaps.
          </p>

        </div>

        {roadmaps.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold">
              No Roadmaps Found
            </h2>
            <p className="text-gray-500 mt-2">
              Generate your first roadmap from the Dashboard.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {roadmaps.map((roadmap) => (

              <div
                key={roadmap._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >

                <h2 className="text-2xl font-bold text-blue-600">
                  {roadmap.career}
                </h2>

                <p className="mt-3 text-gray-600">
                  <strong>Level:</strong> {roadmap.level}
                </p>

                <p className="text-gray-600">
                  <strong>Created:</strong>{" "}
                  {new Date(roadmap.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => setSelectedRoadmap(roadmap)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    📖 View
                  </button>

                  <button
                    onClick={() => deleteRoadmap(roadmap._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {selectedRoadmap && (

          <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold text-blue-700">
                 {selectedRoadmap.career} Roadmap
              </h2>

              <button
                onClick={() => setSelectedRoadmap(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Close
              </button>

            </div>

            <div className="prose prose-lg max-w-none">

              <ReactMarkdown>
                {selectedRoadmap.roadmap}
              </ReactMarkdown>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default MyRoadmaps;