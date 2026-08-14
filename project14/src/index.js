const express = require('express');
const path = require("path");
const multer = require('multer');

const app = express();

// const upload = multer({ dest: path.resolve(__dirname, "../uploads/") });
/**
 * The above method of storing file do not give complete control over files.
 * That's why we use the following method.
 */

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + "-"+ file.originalname);
    }
})

const upload = multer({storage});
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post("/profile", upload.single('image'), (req, res) => {
    // you can store the path of the file in db.
    console.log(req.file);
    console.log(req.body);
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render('home')
});



module.exports= app;