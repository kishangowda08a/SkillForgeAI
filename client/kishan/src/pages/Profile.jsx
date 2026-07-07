import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-2xl font-bold text-blue-600">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-10">

          {/* Profile Header */}

          <div className="flex items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
              {profile.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {profile.name}
              </h2>

              <p className="text-gray-500 text-lg">
                {profile.email}
              </p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
                {profile.role}
              </span>

            </div>

          </div>

          <hr className="my-8" />

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-6 shadow">

              <h3 className="text-gray-500">
                Roadmaps Generated
              </h3>

              <p className="text-4xl font-bold text-blue-700 mt-2">
                {profile.roadmaps}
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-6 shadow">

              <h3 className="text-gray-500">
                Resume Analyses
              </h3>

              <p className="text-4xl font-bold text-green-700 mt-2">
                {profile.resumes}
              </p>

            </div>

            <div className="bg-purple-50 rounded-xl p-6 shadow">

              <h3 className="text-gray-500">
                Interview Sets
              </h3>

              <p className="text-4xl font-bold text-purple-700 mt-2">
                {profile.interviews}
              </p>

            </div>

          </div>

          {/* Account Information */}

          <div className="mt-10 bg-gray-50 rounded-xl p-6">

            <h3 className="text-2xl font-semibold mb-5">
              Account Information
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="font-semibold">Name</span>
                <span>{profile.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Email</span>
                <span>{profile.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Role</span>
                <span>{profile.role}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Joined</span>
                <span>
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="mt-10 bg-white rounded-xl shadow p-6">

            <h3 className="text-2xl font-bold mb-6">
              Recent Activity
            </h3>

            <div className="space-y-4">

              {profile.latestRoadmap && (
                <div className="border rounded-lg p-4">

                  <h4 className="font-bold text-blue-700">
                    Latest Roadmap
                  </h4>

                  <p>
                    {profile.latestRoadmap.career}
                  </p>

                </div>
              )}

              {profile.latestResume && (
                <div className="border rounded-lg p-4">

                  <h4 className="font-bold text-green-700">
                    Latest Resume Analysis
                  </h4>

                  <p>
                    Generated on{" "}
                    {new Date(
                      profile.latestResume.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>
              )}

              {profile.latestInterview && (
                <div className="border rounded-lg p-4">

                  <h4 className="font-bold text-purple-700">
                    Latest Interview Set
                  </h4>

                  <p>
                    {profile.latestInterview.role}
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;