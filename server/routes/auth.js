const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  registerUser,
  logUserOut,
} = require("../controllers");
const { authenticateJWT } = require("../config");

const apiBasePath = "/api/v1/auth";

router.post(`${apiBasePath}/login`, authenticateUser);
router.post(`${apiBasePath}/signup`, registerUser);
router.post(`${apiBasePath}/logout`, [authenticateJWT], logUserOut);

module.exports = router;
