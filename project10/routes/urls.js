const express = require("express");
const { handleGenerateUrl, handleRedirectUrl, handleGetAnalytics } = require("../controllers/urls");

const router = express.Router();

router.post("/", handleGenerateUrl);
router.get("/:url",  handleRedirectUrl);
router.get("/analytics/:url", handleGetAnalytics);

module.exports = router;