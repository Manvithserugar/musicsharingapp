const mongoose = require("mongoose");
const Track = require("./track"); 

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    totalPlayCount: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    artistPopularity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-save hook to calculate totalPlayCount, totalLikes, and artistPopularity
artistSchema.pre("save", async function (next) {
  const artistId = this._id;

  // Aggregate totalPlayCount and totalLikes from the Track model
  const trackStats = await Track.aggregate([
    { $match: { artistId: artistId } },
    {
      $group: {
        _id: null,
        totalPlayCount: { $sum: "$playCount" },
        totalLikes: { $sum: "$likes" },
      },
    },
  ]);

  if (trackStats.length > 0) {
    this.totalPlayCount = trackStats[0].totalPlayCount;
    this.totalLikes = trackStats[0].totalLikes;
  } else {
    this.totalPlayCount = 0;
    this.totalLikes = 0;
  }

  // Calculate artistPopularity (example formula)
  this.artistPopularity =
    this.totalPlayCount * 0.5 +
    this.totalLikes * 0.3 +
    this.totalFollowers * 0.2;

  next();
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
