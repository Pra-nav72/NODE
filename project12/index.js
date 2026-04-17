const express = require("express");
const connectDB = require("./connect.js");
const path = require("path");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 8000;
const router = require("./routes/index.js");
const URL = "mongodb://127.0.0.1:27017/authDB";

connectDB(URL)
.then(()=>console.log("DataBase connected successfully!"))
.catch((error)=>console.log(`DB connection error: ${error}`));


// middleware to parse POST requests
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use("/", router);
// static routes
app.get("/login", (req, res)=>{
    res.render("login");
})

app.listen(PORT, ()=>console.log(`Server start at port: ${PORT}`));