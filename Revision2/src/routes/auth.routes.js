const express = require("express");
const {handleUserSignup, handleUserGetme, handleUserRefreshToken} = require("../controllers/auth.controllers")

const authRouter = express.Router();

// Register user: /api/auth/signup
authRouter.post("/signup", handleUserSignup);

// /api/auth/get-me 
authRouter.get("/get-me", handleUserGetme);

// /api/auth/refresh-token
authRouter.get("/refresh-token", handleUserRefreshToken);

module.exports = authRouter;