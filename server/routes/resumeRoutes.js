const express = require("express");
const router = express.Router();

const pdfParse = require("pdf-parse");

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const OpenAI = require("openai");
const Resume = require("../models/Resume");
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {

    try {

      console.log("FILE:", req.file);

      const pdfData = await pdfParse(req.file.buffer);

      const resumeText = pdfData.text;

      const completion =
        await client.chat.completions.create({

          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "system",
              content:
                "You are an expert resume reviewer."
            },
            {
              role: "user",
              content: `
Analyze this resume:

${resumeText}

Provide:

1. Resume Score out of 100

2. Strengths

3. Weaknesses

4. Suggested Improvements

5. Missing Skills

6. ATS Score

7. Best Job Roles

Return the response in a beautiful structured format.
`
            }
          ],

          temperature: 0.7,
          max_tokens: 1500
        });

     const analysis = completion.choices[0].message.content;

await Resume.create({

  user: req.user.userId,

  fileName: req.file.originalname,

  analysis

});

res.json({
  analysis
});

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;