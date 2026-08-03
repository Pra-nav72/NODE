const express = require("express");
const {handleSignUpUser, handleLoginUser} = require("./Controllers/Users")
const  mongoose = require("mongoose")
const connectDB = require("./connect.js")

const URL = "mongodb://127.0.0.1:27017/UserDB"

const app = new express();

connectDB(URL)
.then(()=>console.log("database connected successfully!"))
.catch((error)=>console.log("Error in DB connection: ", error));

app.use(express.urlencoded({extended: false}));

app.post("/", handleSignUpUser);
app.post("/login", handleLoginUser);

app.get("/", (req, res)=>{
    res.send("hello world");
});

app.listen(8000, ()=> console.log("started!")
);