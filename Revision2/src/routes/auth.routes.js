const express = require("express");
const {handleUserSignup} = require("../controllers/auth.controllers")

const authRouter = express.Router();

authRouter.post("/signup", handleUserSignup);

module.exports = authRouter;