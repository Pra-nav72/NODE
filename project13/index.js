const express = require("express");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(cookieParser());

app.use("/", router)
app.get("/login", (req, res)=>{
    res.render("login");
})
app.get("/signup", (req, res)=>{
    res.render("signup");
})

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`));