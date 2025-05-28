const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "musicFile") {
      cb(null, path.join(__dirname, "../uploads/music"));
    } else if (file.fieldname === "thumbnail") {
      cb(null, path.join(__dirname, "../uploads/thumbnails"));
    } else if (file.fieldname === "artistImage") {
      cb(null, path.join(__dirname, "../uploads/artists"));
    } else if (file.fieldname === "playlistsCoverImage") {
      cb(null, path.join(__dirname, "../uploads/playlistsCoverImage"));
    } else if (file.fieldname === "bannerImage") {
      cb(null, path.join(__dirname, "../uploads/banner"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter to accept only audio and image files
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "musicFile" && file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else if (
    (file.fieldname === "thumbnail" ||
      file.fieldname === "artistImage" ||
      file.fieldname === "bannerImage" ||
      file.fieldname === "playlistsCoverImage") &&
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only audio and image files are allowed."),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter,
});

const uploadMiddleware = upload.fields([
  { name: "musicFile", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "artistImage", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
  { name: "playlistsCoverImage", maxCount: 1 },
]);

module.exports = uploadMiddleware;
