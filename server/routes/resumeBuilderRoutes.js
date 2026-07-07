const express = require("express");
const router = express.Router();

const Resume = require("../models/ResumeBuilder");
const authMiddleware = require("../middleware/authMiddleware");

// Save Resume

router.post(
  "/save",
  authMiddleware,
  async (req, res) => {

    try {

      const resume = await Resume.create({

        user: req.user.userId,

        ...req.body

      });

      res.json(resume);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }

);

// Get All Resumes

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const resumes = await Resume.find({
        user: req.user.userId
      }).sort({ createdAt: -1 });

      res.json(resumes);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }

);

// Get Single Resume

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const resume = await Resume.findById(
        req.params.id
      );

      res.json(resume);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }

);



// Update Resume

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const resume =
        await Resume.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true
          }

        );

      res.json(resume);

    } catch (err) {

  console.error("UPDATE ERROR:");
  console.error(err);

  res.status(500).json({
    message: err.message
  });

}

  }

);

// Get Single Resume
router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const resume =
        await ResumeBuilder.findById(req.params.id);

      res.json(resume);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }
);

// Delete Resume

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Resume.findByIdAndDelete(
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