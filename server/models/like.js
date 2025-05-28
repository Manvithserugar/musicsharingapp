const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  likedAt: { type: Date, default: Date.now, required: true },
});

// Add a compound unique index to prevent duplicate likes for the same user and track
likeSchema.index({ userId: 1, trackId: 1 }, { unique: true });
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
