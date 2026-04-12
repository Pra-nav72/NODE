const express = require("express");
const { connectMongoDb } = require("./connections.js");
const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user.js")


const PORT = 8000;
const app = express();

//connection
connectMongoDb("mongodb://127.0.0.1:27017/Node-user-9")
.then(() => console.log("MongoDB connected successfully!!"))
.catch((error) => console.log(`DataBase connection Error: ${error}`));

// middleware - plugin for Postman requests
app.use(express.urlencoded({extended : false}));

// logging request data in a file
app.use(logReqRes("log.txt"));

// whenever '/user' is requested user.js from routes file will be executed.
app.use("/users", userRouter);


app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`));
