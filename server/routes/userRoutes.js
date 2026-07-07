const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Roadmap = require("../models/Roadmap");
const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, async (req, res) => {
  try {

    const user = await User.findById(req.user.userId).select("-password");

    const roadmapCount = await Roadmap.countDocuments({
      user: req.user.userId
    });

    const resumeCount = await Resume.countDocuments({
      user: req.user.userId
    });

    const interviewCount = await Interview.countDocuments({
      user: req.user.userId
    });

 const latestRoadmap = await Roadmap.findOne({
  user: req.user.userId
}).sort({ createdAt: -1 });

const latestResume = await Resume.findOne({
  user: req.user.userId
}).sort({ createdAt: -1 });

const latestInterview = await Interview.findOne({
  user: req.user.userId
}).sort({ createdAt: -1 });

const totalAIRequests =
  roadmapCount +
  resumeCount +
  interviewCount;

const accountAge =
  Math.floor(
    (Date.now() - user.createdAt) /
    (1000 * 60 * 60 * 24)
  );
res.json({

  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,

  roadmaps: roadmapCount,
  resumes: resumeCount,
  interviews: interviewCount,

  totalAIRequests,

  accountAge,

  latestRoadmap,
  latestResume,
  latestInterview

});

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
});

module.exports = router;