const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  career: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  roadmap: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);