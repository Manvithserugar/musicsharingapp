const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  releaseDate: { type: Date, default: Date.now },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
