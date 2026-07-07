const express = require("express");
const router = express.Router();

const pdfParse = require("pdf-parse");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post(
  "/generate",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {

    try {

      const pdf = await pdfParse(req.file.buffer);

      const resume = pdf.text;

      const completion =
        await client.chat.completions.create({

          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "system",
              content:
                "You are a senior career mentor."
            },
            {
              role: "user",
              content: `
Analyze this resume carefully.

${resume}

Generate a personalized roadmap.

Return in Markdown.

Include:

# Current Skills

# Missing Skills

# Recommended Learning Path

Month 1

Month 2

Month 3

# Projects

# Certifications

# Interview Preparation

`
            }
          ],

          temperature: 0.7,
          max_tokens: 1800

        });

      res.json({

        roadmap:
          completion.choices[0].message.content

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);

module.exports = router;