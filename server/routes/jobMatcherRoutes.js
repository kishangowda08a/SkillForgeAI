const express = require("express");
const router = express.Router();

const pdfParse = require("pdf-parse");

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// const JobMatch = require("../models/JobMatch");

const JobMatch = require("../models/JobMatch");

// console.log(JobMatch);
// console.log(typeof JobMatch.create);

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Analyze Resume vs Job Description

router.post(
  "/analyze",
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
                "You are an expert ATS Resume Reviewer."
            },

            {
              role: "user",
              content: `

Job Title:
${jobTitle}

Company:
${company}

Job Description:

${jobDescription}

Resume:

${resumeText}

Compare the resume with the Job Description.

Return ONLY in Markdown.

# Match Score

# Matching Skills

# Missing Skills

# ATS Score

# Resume Improvements

# Recommended Courses

# Interview Readiness

`
            }

          ],

          temperature: 0.7,
          max_tokens: 1800

        });

      const result =
        completion.choices[0].message.content;

      const saved =
        await JobMatch.create({

          user: req.user.userId,

          jobTitle,

          company,

          matchResult: result

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



module.exports = router;