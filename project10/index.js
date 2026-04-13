const express = require("express");

const {connectMongoDb} = require("./connections");
const urlRoute = require("./routes/urls.js")

const app = express();
const PORT = 8001;



// connections
connectMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("database connected successfully!"))
.catch((error) => console.log(`DataBase connection error: ${error}`));

// middleware for postman
app.use(express.urlencoded({extended: false}));

app.use("/", urlRoute);


app.listen(PORT, ()=> console.log(`server started at port: ${PORT}`));
