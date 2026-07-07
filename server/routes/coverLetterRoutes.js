const express = require("express");
const router = express.Router();

const pdfParse = require("pdf-parse");

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const CoverLetter = require("../models/CoverLetter");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Generate Cover Letter

router.post(
  "/generate",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {

    try {

      const { jobTitle, company, jobDescription } = req.body;

      const pdf = await pdfParse(req.file.buffer);

      const resumeText = pdf.text;

      const completion =
        await client.chat.completions.create({

          model: "llama-3.1-8b-instant",

          messages: [

            {
              role: "system",
              content:
                "You are an expert HR recruiter and professional resume writer."
            },

            {
              role: "user",
              content: `

Write a professional ATS-friendly Cover Letter.

Job Title:
${jobTitle}

Company:
${company}

Job Description:
${jobDescription}

Resume:
${resumeText}

Requirements:

- Professional tone
- Personalized to the company
- Mention relevant projects
- Highlight technical skills
- Keep it around 350-450 words
- Return ONLY markdown

`
            }

          ],

          temperature: 0.7,
          max_tokens: 1500

        });

      const generated =
        completion.choices[0].message.content;

      const saved =
        await CoverLetter.create({

          user: req.user.userId,

          jobTitle,

          company,

          coverLetter: generated

        });

      res.json(saved);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }

);

// Get all Cover Letters

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const letters =
        await CoverLetter.find({
          user: req.user.userId
        }).sort({ createdAt: -1 });

      res.json(letters);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }

);

// Delete Cover Letter

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await CoverLetter.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted Successfully"
      });

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }

);

module.exports = router;