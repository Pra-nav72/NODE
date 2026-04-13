const express = require("express");
const handleGet = require("../controllers/index")

const router = express.Router();

router.get("/", handleGet);

module.exports = router;