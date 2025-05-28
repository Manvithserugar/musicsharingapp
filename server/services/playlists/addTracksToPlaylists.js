const { Playlist } = require("../../models");
const { appError } = require("../../utils");

module.exports = async (userId, trackId, selectedPlaylists) => {
  try {
    //  Find matching playlists
    const playlists = await Playlist.find({
      userId,
      _id: { $in: selectedPlaylists },
    });

    if (!playlists || playlists.length === 0) {
      throw new appError("No matching playlists found", 404);
    }

    //  Filter playlists that don't already have the track
    const toUpdate = playlists
      .filter((pl) => !pl.playlist.includes(trackId))
      .map((pl) => pl._id);

    const alreadyPresent = playlists
      .filter((pl) => pl.playlist.includes(trackId))
      .map((pl) => ({ playlistId: pl._id, name: pl.name }));

    if (toUpdate.length === 0) {
      throw new appError("Track already exists in all selected playlists", 400);
    }

    //  Update only those
    const result = await Playlist.updateMany(
      { _id: { $in: toUpdate } },
      { $push: { playlist: trackId } }
    );

    return { updated: toUpdate, alreadyPresent };
  } catch (err) {
    console.log("error while inserting track into playlists(service): ", err);
    throw err;
  }
};
