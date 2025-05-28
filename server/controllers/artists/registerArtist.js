const { registerArtist } = require("../../services");
const { appError } = require("../../utils");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res, next) => {
  const { artistName } = req.body;
  const userId = req.user._id;
  const artistImageName = req.files?.artistImage?.[0]?.filename || null;
  const bannerImageName = req.files?.bannerImage?.[0]?.filename || null;

  if (!artistName) {
    throw new appError("Artist name is required.", 400);
  }

  let artistImageFilePath = null;
  let bannerImageFilePath = null;

  let bannerImage;
  if (bannerImageName) {
    bannerImage = `http://localhost:3000/uploads/banner/${bannerImageName}`;
    bannerImageFilePath = path.join(
      __dirname,
      "../../uploads/banner",
      bannerImageName
    );
  }

  let artistImage;
  if (artistImageName) {
    artistImage = `http://localhost:3000/uploads/artists/${artistImageName}`;
    artistImageFilePath = path.join(
      __dirname,
      "../../uploads/artists",
      artistImageName
    );
  }

  try {
    const artist = await registerArtist(
      artistName,
      artistImage,
      bannerImage,
      userId
    );
    res.status(201).json({
      status: "success",
      message: "Artist registered successfully.",
      artist,
    });
  } catch (error) {
    console.log("Error while registering artist (controller): ", error);
    if (artistImageFilePath && fs.existsSync(artistImageFilePath)) {
      fs.unlinkSync(artistImageFilePath);
    }
    if (bannerImageFilePath && fs.existsSync(bannerImageFilePath)) {
      fs.unlinkSync(bannerImageFilePath);
    }
    next(error);
  }
};
