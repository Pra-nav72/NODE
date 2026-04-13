const express = require("express");
const { handleGenerateUrl, handleRedirectUrl } = require("../controllers/urls");

const router = express.Router();

router.post("/", handleGenerateUrl);

router.get("/:url",  handleRedirectUrl);

module.exports = router;