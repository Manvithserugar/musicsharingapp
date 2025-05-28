const { Playlist } = require("../../models");

module.exports = async (userId, name, coverImage) => {
  try {
    await Playlist.create({ userId, name, coverImage });
  } catch (err) {
    console.log("error while creating the playlist (service): ", err);
    throw err;
  }
};
