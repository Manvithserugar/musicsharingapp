const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regular expression for email validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  usertype: {
    type: String,
    enum: ["artist", "user"],
    default: "user",
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    default: null,
  },
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
