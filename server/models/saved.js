const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Add a compound unique index to prevent duplicate saves for the same user and track
saveSchema.index({ userId: 1, trackId: 1 }, { unique: true });

const Saved = mongoose.model("Saved", saveSchema);

module.exports = Saved;
