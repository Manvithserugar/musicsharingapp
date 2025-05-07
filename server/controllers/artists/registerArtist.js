const { registerArtist } = require("../../services");

module.exports = async (req, res) => {
  const { artistName } = req.body;
  const userId = req.user._id;

  if (!artistName || !req.files.artistImage) {
    return res.status(400).json({
      status: "fail",
      message: "Artist name and image are required.",
    });
  }

  const artistImage = `${req.protocol}://${req.get("host")}/uploads/artists/${
    req.files.artistImage[0].filename
  }`;

  try {
    const artist = await registerArtist(artistName, artistImage, userId);
    res.status(201).json({
      status: "success",
      message: "Artist registered successfully.",
      artist,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
