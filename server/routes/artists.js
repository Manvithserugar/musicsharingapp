const express = require("express");
const router = express.Router();

const {
  registerArtist,
  retrieveTracksByArtistId,
  retrieveTopArtists,
} = require("../controllers");
const apiBasePath = "/api/v1/artists";

const { authenticateJWT } = require("../config");
const { uploadMiddleware } = require("../middlewares");

router.post(
  `${apiBasePath}/create`,
  [authenticateJWT, uploadMiddleware],
  registerArtist
);
router.get(
  `${apiBasePath}/tracks/:artistId`,
  authenticateJWT,
  retrieveTracksByArtistId
);
router.get(`${apiBasePath}/top`, retrieveTopArtists);

module.exports = router;
