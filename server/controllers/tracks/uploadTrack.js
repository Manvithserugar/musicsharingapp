const { appError } = require("../../utils");
const { uploadTrack } = require("../../services");

module.exports = async (req, res, next) => {
  try {
    const { name, artist, album } = req.body;
    const artistId = req.user._id;

    if (!req.files || !req.files.musicFile || !req.files.thumbnail) {
      return next(
        new appError("Both music file and thumbnail are required.", 400)
      );
    }

    const musicFileName = req.files.musicFile[0].filename;
    const thumbnailName = req.files.thumbnail[0].filename;

    const musicFileUrl = `http://localhost:3000/uploads/thumbnails/${musicFileName}`;
    const thumbnailUrl = `http://localhost:3000/uploads/thumbnails/${thumbnailName}`;

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
    next(error);
  }
};
