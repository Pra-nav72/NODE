const express = require("express");
const router = require("./routes/index");
const path = require("path");

const PORT  = 8000;
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// // use res.render() to load the ejs file

app.set("views", path.resolve("./views"));
app.use("/", router);
// app.get("/", (req, res) =>{
//     res.render("home");
// })

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`));