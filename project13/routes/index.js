const express = require("express");
const { handleHomePage, handleLoginPage, handleSignupPage, handleGetKids} = require("../controllers/index");
const {restrictToLoggedInUsersOnly} = require("../middlewares/auth");

const router = express.Router();

router.get("/", handleHomePage);
router.post("/signup", handleSignupPage);
router.post("/login", handleLoginPage);
router.get("/kids",restrictToLoggedInUsersOnly, handleGetKids);
module.exports = router;

