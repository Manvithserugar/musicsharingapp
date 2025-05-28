const { appError } = require("../../utils");
const { uploadTrack } = require("../../services");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res, next) => {
  let musicFilePath;
  let thumbnailFilePath;
  try {
    const { name, artist, artistId, album } = req.body;

    if (!req.files || !req.files.musicFile || !req.files.thumbnail) {
      return next(
        new appError("Both music file and thumbnail are required.", 400)
      );
    }

    const musicFileName = req.files.musicFile[0].filename;
    const thumbnailName = req.files.thumbnail[0].filename;

    let musicFileUrl = null;
    let thumbnailUrl = null;

    if (musicFileName) {
      musicFileUrl = `http://localhost:3000/uploads/thumbnails/${musicFileName}`;

      musicFilePath = path.join(
        __dirname,
        "../../uploads/musicFiles",
        musicFileName
      );
    }

    if (thumbnailName) {
      thumbnailFilePath = path.join(
        __dirname,
        "../../uploads/thumbnails",
        thumbnailName
      );

      thumbnailUrl = `http://localhost:3000/uploads/thumbnails/${thumbnailName}`;
    }

    const track = await uploadTrack(
      name,
      artist,
      artistId,
      album,
      musicFileUrl,
      thumbnailUrl
    );

    res.status(201).json({ message: "Track uploaded successfully.", track });
  } catch (error) {
    console.log("Error while uploading track (controller): ", error);
    if (thumbnailFilePath && fs.existsSync(thumbnailFilePath)) {
      fs.unlinkSync(thumbnailFilePath);
    }
    if (musicFilePath && fs.existsSync(musicFilePath)) {
      fs.unlinkSync(musicFilePath);
    }
    next(error);
  }
};
