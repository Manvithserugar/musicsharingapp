const { appError } = require("../../utils");
const { createPlaylist } = require("../../services");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res, next) => {
  let coverImagePath = null;
  try {
    const { playlistName } = req.body;
    const userId = req.user._id;
    const coverImageFile = req.files?.playlistsCoverImage?.[0];
    let coverImageURL = null;
    if (coverImageFile) {
      console.log("this is cover image");

      const coverImageName = coverImageFile.filename;
      coverImageURL = `http://localhost:3000/uploads/playlistsCoverImage/${coverImageName}`;
      coverImagePath = path.join(
        __dirname,
        "../../uploads/playlistsCoverImage",
        coverImageName
      );
    }
    await createPlaylist(userId, playlistName, coverImageURL);
    res.status(201).json({ message: "playlist created successfully" });
  } catch (err) {
    // Delete the uploaded file if DB operation fails
    if (coverImagePath && fs.existsSync(coverImagePath)) {
      fs.unlinkSync(coverImagePath);
    }
    console.log("error while creating the playlist (controller): ", err);
    next(err);
  }
};
