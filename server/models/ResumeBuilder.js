const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  personal: {

    fullName: String,

    email: String,

    phone: String,

    location: String,

    linkedin: String,

    github: String,

    portfolio: String

  },

  summary: {
    type: String,
    default: ""
  },

  skills: [
    {
      type: String
    }
  ],

  education: [

    {

      college: String,

      degree: String,

      year: String,

      cgpa: String

    }

  ],

  experience: [

    {

      company: String,

      role: String,

      duration: String,

      description: String

    }

  ],

  projects: [

    {

      title: String,

      description: String,

      technologies: String,

      github: String

    }

  ],

  certifications: [

    {

      name: String,

      issuer: String,

      year: String

    }

  ],

  achievements: [

    String

  ]

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "ResumeBuilder",
  resumeSchema
);