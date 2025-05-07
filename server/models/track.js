const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
    musicFilePath: { type: String, required: true },
    thumbnailPath: { type: String },
    likes: { type: Number, default: 0 },
    playCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    popularityScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate popularity score
trackSchema.pre("save", function (next) {
  const WEIGHTS = {
    likes: 1,
    playCount: 0.5,
    shareCount: 2,
  };

  // Calculate popularity score
  this.popularityScore =
    this.likes * WEIGHTS.likes +
    this.playCount * WEIGHTS.playCount +
    this.shareCount * WEIGHTS.shareCount;

  next();
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
