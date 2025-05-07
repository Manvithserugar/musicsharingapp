const { Track } = require("../../models");

const uploadTrack = async (
  name,
  artist,
  artistId,
  album,
  musicFilePath,
  thumbnailPath
) => {
  try {
    const newTrack = new Track({
      name,
      artist,
      artistId,
      album,
      musicFilePath,
      thumbnailPath,
    });
    const savedTrack = await newTrack.save();
    return savedTrack;
  } catch (error) {
    console.error("Error saving track: (database operation)", error);
    throw error;
  }
};

module.exports = uploadTrack;
