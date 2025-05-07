const { search } = require("../../services");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return next(new appError("Search query is required.", 400));
    }

    const tracks = await search(query.trim());
    res.status(200).json({ message: "Tracks retrieved successfully.", tracks });
  } catch (error) {
    console.log("error during search", error);
    next(error);
  }
};
