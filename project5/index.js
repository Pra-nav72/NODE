// const http = require('http'); ----> Express manages all itself

const express = require('express');

// app will work like a handler function
const app = express();

// get is type of request to handle, other request can be [post, put, fetch, delete]
// this will only execute if request method is get and '/' --> home page url.
app.get('/', (req, res)=>{
    res.send("hello user, this is Home Page.");
});

// express provides all 'url' package features
app.get('/about', (req, res)=>{
    res.send("This is about Page for " + req.query.name + " id: "+ req.query.id);
    // if query => localhost:8000/about?name=pranav
});

// Express also create port for listening:
app.listen(8000, () => console.log("server started!"));



// const myServer = http.createServer(app);

// myServer.listen(8000, ()=>{
//     console.log("server started!");
// });