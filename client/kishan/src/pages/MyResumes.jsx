import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function MyResumes() {

  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/resumebuilder", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResumes(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const deleteResume = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/resumebuilder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchResumes();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          My Resumes
        </h1>

        {resumes.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">
            No resumes saved yet.
          </div>

        ) : (

          resumes.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.personal?.fullName || "Untitled Resume"}
                  </h2>

                  <p className="text-gray-500">
                    {item.personal?.email}
                  </p>

                </div>

               <div className="flex gap-3">

  <button
    onClick={() =>
      navigate(`/resume-builder/${item._id}`)
    }
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteResume(item._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default MyResumes;