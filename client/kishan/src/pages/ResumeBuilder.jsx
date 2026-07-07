import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import API from "../services/api";

function ResumeBuilder() {
  const [resume, setResume] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: ""
    },
    summary: "",
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: []
  });

  const [skill, setSkill] = useState("");
  const [education, setEducation] = useState({ college: "", degree: "", year: "", cgpa: "" });
  const [experience, setExperience] = useState({ company: "", role: "", duration: "", description: "" });
  const [project, setProject] = useState({ title: "", description: "", technologies: "", github: "", live: "" });
  const [certification, setCertification] = useState({ title: "", issuer: "", year: "" });
  const [achievement, setAchievement] = useState("");

  const { id } = useParams();
  const resumeRef = useRef(null);

  const saveResume = async () => {
    try {
      const token = localStorage.getItem("token");
      if (id) {
        await API.put(`/resumebuilder/${id}`, resume, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Resume Updated Successfully!");
      } else {
        await API.post("/resumebuilder/save", resume, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Resume Saved Successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save resume.");
    }
  };

  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await API.get(`/resumebuilder/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setResume(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchResume();
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resume.personal.fullName || "Resume",
  });

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      
      {/* ================= FIXED TOP OUTER HEADER ================= */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm z-20 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Resume Builder Workspace
          </h1>
          <div className="flex gap-3">
            <button
              onClick={saveResume}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm shadow transition"
            >
              Save Resume
            </button>
            <button
              onClick={handlePrint}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm shadow transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN SCROLLABLE CONTENT WORKSPACE ================= */}
      <div className="flex-1 overflow-hidden p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto h-full items-start">
          
          {/* LEFT SIDE: INPUT FORMS (Independently Scrollable) */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6 h-full overflow-y-auto pb-12">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Details</h2>
              
              {/* Personal Info */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={resume.personal.fullName}
                  onChange={(e) => setResume({
                    ...resume,
                    personal: { ...resume.personal, fullName: e.target.value }
                  })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={resume.personal.email}
                  onChange={(e) => setResume({
                    ...resume,
                    personal: { ...resume.personal, email: e.target.value }
                  })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={resume.personal.phone}
                    onChange={(e) => setResume({
                      ...resume,
                      personal: { ...resume.personal, phone: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={resume.personal.location}
                    onChange={(e) => setResume({
                      ...resume,
                      personal: { ...resume.personal, location: e.target.value }
                    })}
                  />
                </div>
                <textarea
                  rows="4"
                  placeholder="Professional Summary"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={resume.summary}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Skills</h2>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Enter Skill (e.g. React)"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!skill.trim()) return;
                    setResume({ ...resume, skills: [...resume.skills, skill.trim()] });
                    setSkill("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {resume.skills.map((item, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium border border-blue-200">
                    {item}
                    <button
                      type="button"
                      onClick={() => setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== index) })}
                      className="text-blue-500 hover:text-red-600 font-bold ml-1"
                    >
                      ×
                  </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Education Section */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Education</h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="College/University"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={education.college}
                  onChange={(e) => setEducation({ ...education, college: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Degree / Major"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={education.degree}
                  onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Graduation Year"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={education.year}
                    onChange={(e) => setEducation({ ...education, year: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CGPA / Percentage"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={education.cgpa}
                    onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!education.college || !education.degree) return;
                    setResume({ ...resume, education: [...resume.education, education] });
                    setEducation({ college: "", degree: "", year: "", cgpa: "" });
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full transition font-semibold"
                >
                  Add Education
                </button>
              </div>

              <div className="space-y-2">
                {resume.education.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-gray-50">
                    <div>
                      <h3 className="font-bold text-gray-800">{item.college}</h3>
                      <p className="text-sm text-gray-600">{item.degree} — <span className="text-xs text-gray-500">{item.year}</span></p>
                      {item.cgpa && <p className="text-xs text-blue-600 font-medium">CGPA: {item.cgpa}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setResume({ ...resume, education: resume.education.filter((_, i) => i !== index) })}
                      className="text-red-500 text-sm font-medium hover:underline px-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Experience Section */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Experience</h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={experience.company}
                  onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Job Role"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={experience.role}
                  onChange={(e) => setExperience({ ...experience, role: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., Jan 2024 - Present)"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={experience.duration}
                  onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
                />
                <textarea
                  rows="3"
                  placeholder="Describe your responsibilities & achievements..."
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={experience.description}
                  onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!experience.company || !experience.role) return;
                    setResume({ ...resume, experience: [...resume.experience, experience] });
                    setExperience({ company: "", role: "", duration: "", description: "" });
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg w-full transition font-semibold"
                >
                  Add Experience
                </button>
              </div>

              <div className="space-y-2">
                {resume.experience.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-bold text-gray-800 truncate">{item.company}</h3>
                      <p className="text-sm font-medium text-gray-700">{item.role} <span className="text-xs text-gray-400 font-normal">({item.duration})</span></p>
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{item.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResume({ ...resume, experience: resume.experience.filter((_, i) => i !== index) })}
                      className="text-red-500 text-sm font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Projects Section */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Projects</h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Technologies Used (separated by commas)"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={project.technologies}
                  onChange={(e) => setProject({ ...project, technologies: e.target.value })}
                />
                <textarea
                  rows="3"
                  placeholder="Project Description"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="GitHub Link"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={project.github}
                    onChange={(e) => setProject({ ...project, github: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Live Demo Link"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={project.live}
                    onChange={(e) => setProject({ ...project, live: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!project.title) return;
                    setResume({ ...resume, projects: [...resume.projects, project] });
                    setProject({ title: "", description: "", technologies: "", github: "", live: "" });
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg w-full transition font-semibold"
                >
                  Add Project
                </button>
              </div>

              <div className="space-y-2">
                {resume.projects.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-xs font-semibold text-teal-600">{item.technologies}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 text-sm font-medium hover:underline ml-2"
                      onClick={() => setResume({ ...resume, projects: resume.projects.filter((_, i) => i !== index) })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Certifications Section */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Certifications</h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Certification Title"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={certification.title}
                  onChange={(e) => setCertification({ ...certification, title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Issuer"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={certification.issuer}
                    onChange={(e) => setCertification({ ...certification, issuer: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={certification.year}
                    onChange={(e) => setCertification({ ...certification, year: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!certification.title) return;
                    setResume({ ...resume, certifications: [...resume.certifications, certification] });
                    setCertification({ title: "", issuer: "", year: "" });
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-full transition font-semibold"
                >
                  Add Certification
                </button>
              </div>

              <div className="space-y-2 mb-6">
                {resume.certifications.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.issuer} • {item.year}</p>
                    </div>
                    <button
                      className="text-red-500 text-sm font-medium hover:underline"
                      onClick={() => setResume({ ...resume, certifications: resume.certifications.filter((_, i) => i !== index) })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-3 text-gray-800">Achievements</h2>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Add Achievement / Honor"
                  className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!achievement.trim()) return;
                    setResume({ ...resume, achievements: [...resume.achievements, achievement.trim()] });
                    setAchievement("");
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-lg transition"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2">
                {resume.achievements.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-700">{item}</p>
                    <button
                      type="button"
                      className="text-red-500 text-sm font-medium hover:underline ml-2"
                      onClick={() => setResume({ ...resume, achievements: resume.achievements.filter((_, i) => i !== index) })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LIVE RESUME PREVIEW PANEL (Independently Scrollable) */}
          <div className="flex flex-col h-full overflow-hidden bg-gray-200 rounded-xl border border-gray-300 p-4">
            <div className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 px-1">
              Live Preview Document
            </div>
            
            <div className="flex-1 overflow-y-auto rounded-lg">
              <div
                ref={resumeRef}
                className="bg-white w-full mx-auto p-8 shadow-2xl min-h-[297mm] text-gray-800 printable-paper font-sans"
                style={{ contentVisibility: "auto" }}
              >
                {/* Header Info */}
                <div className="mb-6 border-b-2 border-gray-800 pb-4 text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
                    {resume.personal.fullName || "Your Full Name"}
                  </h1>
                  <div className="text-gray-600 mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-medium">
                    {resume.personal.email && <span>✉ {resume.personal.email}</span>}
                    {resume.personal.phone && <span>📞 {resume.personal.phone}</span>}
                    {resume.personal.location && <span>📍 {resume.personal.location}</span>}
                  </div>
                </div>

                {/* Summary */}
                {resume.summary && (
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap">
                      {resume.summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {resume.skills.length === 0 ? (
                      <p className="text-gray-400 text-xs italic">No skills added yet.</p>
                    ) : (
                      resume.skills.map((item, index) => (
                        <span key={index} className="text-gray-800 text-xs font-medium">
                          • {item}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                    Experience
                  </h2>
                  {resume.experience.length === 0 ? (
                    <p className="text-gray-400 text-xs italic">No experience added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {resume.experience.map((item, index) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>{item.company}</span>
                            <span className="text-gray-500 font-normal text-[11px]">{item.duration}</span>
                          </div>
                          <p className="text-gray-700 italic font-medium mb-1 text-[11px]">{item.role}</p>
                          <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                    Projects
                  </h2>
                  {resume.projects.length === 0 ? (
                    <p className="text-gray-400 text-xs italic">No projects added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {resume.projects.map((item, index) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>{item.title}</span>
                          </div>
                          {item.technologies && (
                            <p className="text-[11px] text-gray-500 font-semibold mb-0.5">
                              Technologies: {item.technologies}
                            </p>
                          )}
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                          <div className="flex gap-3 text-[11px] mt-0.5">
                            {item.github && <a href={item.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>}
                            {item.live && <a href={item.live} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">Live Demo</a>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                    Education
                  </h2>
                  {resume.education.length === 0 ? (
                    <p className="text-gray-400 text-xs italic">No education added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {resume.education.map((item, index) => (
                        <div key={index} className="text-xs">
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>{item.college}</span>
                            <span className="text-gray-500 font-normal text-[11px]">{item.year}</span>
                          </div>
                          <div className="flex justify-between text-gray-700 text-[11px]">
                            <span>{item.degree}</span>
                            {item.cgpa && <span className="font-medium text-gray-600">CGPA: {item.cgpa}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certifications */}
                {resume.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                      Certifications
                    </h2>
                    <div className="space-y-1.5">
                      {resume.certifications.map((item, index) => (
                        <div key={index} className="text-xs flex justify-between items-start">
                          <div>
                            <span className="font-bold text-gray-800">{item.title}</span>
                            <span className="text-gray-500 text-[11px]"> — {item.issuer}</span>
                          </div>
                          <span className="text-gray-500 text-[11px]">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {resume.achievements.length > 0 && (
                  <div>
                    <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                      Achievements & Honors
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                      {resume.achievements.map((item, index) => (
                        <li key={index} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;