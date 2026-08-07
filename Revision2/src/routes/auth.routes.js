const express = require("express");
const {handleUserSignup, handleUserGetme} = require("../controllers/auth.controllers")

const authRouter = express.Router();

authRouter.post("/signup", handleUserSignup);
authRouter.get("/get-me", handleUserGetme);

module.exports = authRouter;