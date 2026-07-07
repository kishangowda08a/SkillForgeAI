const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  role: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  questions: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);