const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
// used to log request (args: dev/common/combined/...)
app.use(morgan("dev")); 
app.use(cookieParser());
app.use("/api/auth", authRouter); // whichever req has /api/auth will go to authRouter


module.exports = app;