const express = require("express");
const router = express.Router();

const { search } = require("../controllers");
const apiBasePath = "/api/v1/search";

router.get(`${apiBasePath}`, search);

module.exports = router;
