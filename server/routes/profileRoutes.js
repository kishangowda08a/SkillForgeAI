const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");
const Roadmap = require("../models/Roadmap");
const Interview = require("../models/Interview");
const Resume = require("../models/Resume");

router.get("/", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.userId).select("-password");

        const roadmapCount = await Roadmap.countDocuments({
            user: req.user.userId
        });

        const interviewCount = await Interview.countDocuments({
            user: req.user.userId
        });

        const resumeCount = await Resume.countDocuments({
            user: req.user.userId
        });

        res.json({

            user,

            roadmapCount,

            interviewCount,

            resumeCount

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;