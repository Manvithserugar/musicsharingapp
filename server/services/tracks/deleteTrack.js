const fs = require("fs/promises");
const { Track } = require("../../models");

const deleteTrack = async (id) => {
  try {
    const trackToDelete = await Track.findById(id);

    if (!trackToDelete) {
      return null;
    }

    // Remove files from the file system
    const { musicFilePath, thumbnailPath } = trackToDelete;
    const thumbnailFileLocalPath = `uploads/thumbnails/${thumbnailPath
      .split("/")
      .pop()}`;
    const musicFileLocalPath = `uploads/music/${musicFilePath
      .split("/")
      .pop()}`;

    await Promise.all([
      fs.unlink(musicFileLocalPath),
      fs.unlink(thumbnailFileLocalPath),
    ]);

    // Remove the Track from the database
    await Track.deleteOne({ _id: id });

    return true;
  } catch (error) {
    console.error("Error deleting Track:", error.message);
    throw error;
  }
};

module.exports = deleteTrack;
