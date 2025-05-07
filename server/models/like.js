const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
