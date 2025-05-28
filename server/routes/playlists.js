const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getUserPlaylists,
  addTracksToPlaylists,
  removeTrackFromPlaylist,
  getPlaylistById,
} = require("../controllers");

const { uploadMiddleware } = require("../middlewares");
const { authenticateJWT } = require("../config");

const apiBasePath = "/api/v1/playlists";

router.post(
  `${apiBasePath}/create`,
  [authenticateJWT, uploadMiddleware],
  createPlaylist
);

router.get(`${apiBasePath}/user`, [authenticateJWT], getUserPlaylists);
router.post(
  `${apiBasePath}/add/track`,
  [authenticateJWT],
  addTracksToPlaylists
);

router.delete(
  `${apiBasePath}/delete/track/:trackId/:playlistId`,
  [authenticateJWT],
  removeTrackFromPlaylist
);

router.get(`${apiBasePath}/:playlistId`, [authenticateJWT], getPlaylistById);

module.exports = router;
