const express = require("express");
const {handleUserSignup, handleUserGetme, handleUserRefreshToken, handleUserLogout} = require("../controllers/auth.controllers")

const authRouter = express.Router();

// Register user: /api/auth/signup
authRouter.post("/signup", handleUserSignup);

// /api/auth/get-me 
authRouter.get("/get-me", handleUserGetme);

// /api/auth/refresh-token
authRouter.get("/refresh-token", handleUserRefreshToken);


// /api/auth/logout ==> logging out & delete session & cookie
authRouter.get("/logout", handleUserLogout);
module.exports = authRouter;