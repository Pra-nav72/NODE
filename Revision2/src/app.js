const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

// used to log request (args: dev/common/combined/...)
app.use(morgan("dev")); 

module.exports = app;