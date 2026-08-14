const express = require('express');
const path = require("path");
const multer = require('multer');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const upload = multer({ dest: path.resolve(__dirname, "../uploads/") });

app.post("/profile", upload.single('image'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render('home')
});



module.exports= app;