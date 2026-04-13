const express = require("express");
const { handleGenerateUrl, handleRedirectUrl, handleGetAnalytics } = require("../controllers/urls");

const router = express.Router();

router.post("/url", handleGenerateUrl);
router.get("/:url",  handleRedirectUrl);
router.get("/url/analytics/:url", handleGetAnalytics);

module.exports = router;