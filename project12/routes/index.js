const express = require("express");
const {handleHome, handleCreateUser, handleGetUser, handleLoginUser} = require("../controllers/index");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUsersOnly} = require("../middlewares/auth.js");

const router = express.Router();

router.post("/users", handleLoginUser);      
router.get("/signup", handleHome);
router.post("/", handleCreateUser);
router.get("/users", restrictToLoggedInUsersOnly, handleGetUser);
module.exports = router;