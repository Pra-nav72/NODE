const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/auth.routes")

const app = express();

app.use(express.json());
// used to log request (args: dev/common/combined/...)
app.use(morgan("dev")); 
app.use("/api/auth", authRouter); // whichever req has /api/auth will go to authRouter


module.exports = app;