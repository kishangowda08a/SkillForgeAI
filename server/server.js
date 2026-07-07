const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Move this here

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes =
require("./routes/resumeRoutes");
const interviewRoutes =
require("./routes/interviewRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoadmapRoutes =
require("./routes/resumeRoadmapRoutes");
const userRoutes = require("./routes/userRoutes");
const jobMatcherRoutes =
require("./routes/jobMatcherRoutes");
const coverLetterRoutes = require("./routes/coverLetterRoutes");
const resumeBuilderRoutes = require("./routes/resumeBuilderRoutes");
// const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  mongoose.connection.once("open", () => {
  console.log(
    "Database Name:",
    mongoose.connection.db.databaseName
  );
});

app.get("/", (req, res) => {
  res.send("SkillForge API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use(
  "/api/interview",
  interviewRoutes
);

app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/api/jobmatcher",
  jobMatcherRoutes
);
app.use("/api/coverletter", coverLetterRoutes);
app.use("/api/resumebuilder", resumeBuilderRoutes);


app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});