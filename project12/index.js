const express = require("express");
const path = require("path");
const connectDB = require("./connect.js");


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

app.use("/", router);

app.listen(PORT, ()=>console.log(`Server start at port: ${PORT}`));