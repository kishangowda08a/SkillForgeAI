const express = require("express");
const router = express.Router();

const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/authMiddleware");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Generate Interview Questions
router.post(
  "/generate",
  authMiddleware,
  async (req, res) => {

    try {

      const { role, experience, difficulty } = req.body;

      console.log("BODY:", req.body);
console.log({
  role,
  experience,
  difficulty
});

      const completion =
        await client.chat.completions.create({

          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "system",
              content:
                "You are an experienced technical interviewer."
            },
            {
              role: "user",
              content: `
Role: ${role}

Experience: ${experience}

Difficulty: ${difficulty}

Generate:

# Technical Questions
10 questions with short answers.

# Coding Questions
5 coding questions.

# HR Questions
5 HR interview questions.

Return the response in Markdown.
`
            }
          ],

          temperature: 0.7,
          max_tokens: 1800
        });

      const generatedQuestions =
        completion.choices[0].message.content;

   console.log("Before Interview.create");

const interview = await Interview.create({
  user: req.user.userId,
  role,
  experience,
  difficulty,
  questions: generatedQuestions
});



res.json({
  questions: generatedQuestions
});

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// Get All Interview Sets
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const interviews =
        await Interview.find({
          user: req.user.userId
        });

      res.json(interviews);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// Delete Interview Set
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Interview.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;