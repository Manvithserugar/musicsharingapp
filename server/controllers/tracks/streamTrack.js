const fs = require("fs");
const { Track } = require("../../models");
const { appError } = require("../../utils");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trackData = await Track.findById(id);

    if (!trackData) {
      return next(new appError("Track not found.", 404));
    }

    const musicFilePath = trackData.musicFilePath;
    const musicFileLocalPath = `uploads/music/${musicFilePath
      .split("/")
      .pop()}`;

    // Check if file exists
    if (!fs.existsSync(musicFileLocalPath)) {
      return next(new appError("Music file not found on the server.", 404));
    }

    const stat = fs.statSync(musicFileLocalPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // Define default range (e.g., first 256KB)
    const DEFAULT_CHUNK_SIZE = 262144; // 256KB in bytes
    let start, end;

    if (range) {
      // Parse range header
      const parts = range.replace(/bytes=/, "").split("-");
      start = parseInt(parts[0], 10);
      end = parts[1] ? parseInt(parts[1], 10) : start + DEFAULT_CHUNK_SIZE - 1;
    } else {
      // Use default range
      start = 0;
      end = Math.min(DEFAULT_CHUNK_SIZE - 1, fileSize - 1);
    }

    // If start is beyond file size, return empty response
    if (start >= fileSize) {
      res.writeHead(206, {
        "Content-Range": `bytes */${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": 0,
        "Content-Type": "audio/mpeg",
      });
      return res.end();
    }

    // Cap end to fileSize - 1 if it exceeds file size
    if (end >= fileSize) {
      end = fileSize - 1;
    }

    const chunkSize = end - start + 1;
    const fileStream = fs.createReadStream(musicFileLocalPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
    });

    fileStream.pipe(res);
  } catch (error) {
    next(error);
  }
};
