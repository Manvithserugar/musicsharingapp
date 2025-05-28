const { Playlist } = require("../../models");

module.exports = async (userId) => {
  try {
    const userPlaylists = await Playlist.find(
      { userId },
      { name: 1, coverImage: 1 }
    );
    return userPlaylists;
  } catch (err) {
    console.log("error while fetching the playlists (service): ", err);
    throw err;
  }
};
