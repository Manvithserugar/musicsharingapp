const { Like, Saved, Playlist } = require("../../models");

module.exports = async (trackId, userId) => {
  try {
    // Check if track is liked
    const likedTrack = await Like.findOne({
      userId: userId,
      trackId: trackId,
    });
    const isLiked = likedTrack ? true : false;

    // Check if track is saved
    const savedTrack = await Saved.findOne({
      userId: userId,
      trackId: trackId,
    });
    const isSaved = savedTrack ? true : false;

    // Find all playlists where the track has been added for the user
    const playlistsWithTrack = await Playlist.find(
      { userId: userId, playlist: trackId },
      { _id: 1 }
    );
    const playlistIds = playlistsWithTrack.map((pl) => pl._id);

    return { isLiked, isSaved, playlistIds };
  } catch (error) {
    console.error("Error checking engagement status:(service)", error);
    throw error;
  }
};
