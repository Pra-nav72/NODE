const express = require("express");
const { handleGenerateUrl } = require("../controllers/urls");

const router = express.Router();

router.post("/", handleGenerateUrl);

module.exports = router;