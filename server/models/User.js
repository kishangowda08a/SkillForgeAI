// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  },

  secretQuestion: { 
    type: String, 
    default: "What is your favorite programming language?" 
  },
  
  secretAnswer: { 
    type: String, 
    required: true,
    default: "javascript" // Safe default fallback for old existing accounts
  }
});

module.exports = mongoose.model("User", userSchema);