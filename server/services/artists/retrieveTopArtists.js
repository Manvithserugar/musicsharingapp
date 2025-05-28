const { Artist } = require("../../models");
const { appError } = require("../../utils");

module.exports = async () => {
  try {
    const topTenArtists = Artist.find()
      .sort({ artistPopularity: -1 })
      .limit(10);
    if (!topTenArtists) {
      throw new appError("No artists found", 404);
    }
    return topTenArtists;
  } catch (err) {
    console.log("Error in retrieveTopArtists (service):", err);
    throw err;
  }
};
