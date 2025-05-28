const express = require("express");
const router = express.Router();

const {
  uploadTrack,
  getTrack,
  getTopTracks,
  deleteTrack,
  streamTrack,
  likeTrack,
  dislikeTrack,
  saveTrack,
  unsaveTrack,
} = require("../controllers");
const { uploadMiddleware } = require("../middlewares");
const { authenticateJWT } = require("../config");

const apiBasePath = "/api/v1/tracks";

router.post(
  `${apiBasePath}/upload`,
  [authenticateJWT, uploadMiddleware],
  uploadTrack
);

router.get(`${apiBasePath}/top`, getTopTracks);
router.get(`${apiBasePath}/:id`, getTrack);
router.delete(`${apiBasePath}/:id`, [authenticateJWT], deleteTrack);
router.get(`${apiBasePath}/:id/stream`, [authenticateJWT], streamTrack);
router.post(`${apiBasePath}/:trackId/like`, [authenticateJWT], likeTrack);
router.delete(
  `${apiBasePath}/:trackId/dislike`,
  [authenticateJWT],
  dislikeTrack
);
router.post(`${apiBasePath}/:trackId/save`, [authenticateJWT], saveTrack);
router.delete(`${apiBasePath}/:trackId/unsave`, [authenticateJWT], unsaveTrack);

module.exports = router;
