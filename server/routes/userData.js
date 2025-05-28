const express = require("express");
const router = express.Router();

const {
  userTrackEngmtStatus,
  fetchSavedTracks,
  fetchLikedTracks,
  getUserProfile,
} = require("../controllers");

const { authenticateJWT } = require("../config");

const apiBasePath = "/api/v1/userdata";

router.get(`${apiBasePath}/profile`, [authenticateJWT], getUserProfile);
router.get(`${apiBasePath}/:trackId`, [authenticateJWT], userTrackEngmtStatus);
router.get(`${apiBasePath}/tracks/saved`, [authenticateJWT], fetchSavedTracks);
router.get(`${apiBasePath}/tracks/liked`, [authenticateJWT], fetchLikedTracks);

// router.get(`${apiBasePath}`, [authenticateJWT],);

module.exports = router;
