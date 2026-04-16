const express = require("express");
const {handleHome, handleCreateUser, handleGetUser} = require("../controllers/index");


const router = express.Router();

router.get("/", handleHome);
router.post("/", handleCreateUser);
router.get("/users", handleGetUser);
module.exports = router;