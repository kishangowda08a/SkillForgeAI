const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");

const express = require("express");
const router = express.Router();

const OpenAI = require("openai");


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Test Route
router.get("/test", (req, res) => {
  res.send("Groq AI Route Working");
});

// Generate Roadmap
router.post("/roadmap", authMiddleware, async (req, res) => {
    try {
    const { career, level } = req.body;


    console.log("MODEL USED: llama-3.1-8b-instant");
    const completion = await client.chat.completions.create({
   model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content:
            "You are a career mentor who creates structured learning roadmaps."
        },
        {
          role: "user",
          content: `
Create a detailed learning roadmap.

Career Goal: ${career}
Current Level: ${level}

Provide:

1. Month-wise roadmap
2. Weekly tasks
3. Projects to build
4. Recommended resources

Return in a clean structured format.
`
        }
      ],

      temperature: 0.7,
      max_tokens: 1500
    });

const generatedRoadmap =
  completion.choices[0].message.content;

const roadmap = await Roadmap.create({
  user: req.user.userId,
  career,
  level,
  roadmap: generatedRoadmap
});

res.json({
  roadmap
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});


router.get("/roadmaps", authMiddleware, async (req, res) => {
  try {
const roadmaps = await Roadmap.find({
  user: req.user.userId
});
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/roadmap/:id", authMiddleware, async (req, res) => {
  try {
    await Roadmap.findByIdAndDelete(req.params.id);

    res.json({
      message: "Roadmap Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;