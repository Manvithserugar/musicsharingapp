const express = require("express");
const router = express.Router();

const { registerArtist } = require("../controllers");
const apiBasePath = "/api/v1/artists";

const { authenticateJWT } = require("../config");
const { uploadMiddleware } = require("../middlewares");

router.post(
  `${apiBasePath}`,
  [authenticateJWT, uploadMiddleware],
  registerArtist
);

module.exports = router;
