const { required } = require("joi");
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  coverImage: { type: String },
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
});

module.exports = mongoose.model("Playlist", playlistSchema);
