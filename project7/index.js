const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 8000;

// first Middleware. For POST Requests from POSTMAN
app.use(express.urlencoded({extended : false}));

// Middleware next -> reference to the next middleware funtion (here, app.use()) in stack
app.use((req, res, next) => {
    console.log("executing MIDDLEWARE-1");
    
    // perform operation on request object(req)
    console.log(req.url);

    fs.appendFile("log.txt", `${new Date().toISOString()} - ${req.method} - ${req.path} \n`, (err, data)=>{
        // calling next middleware
        next();
    })
})
// Middleware next -> reference to the next middleware funtion (here, app.get()) in stack
app.use((req, res, next) => {
    console.log("executing MIDDLEWARE-2");
    // changing the request
    req.myUserName = "pranav";
    // calling next middleware
    next();
})

// handle get request
app.get('/api/students', (req, res) => {
    res.end("<h1> ALL STUDENTS RECORDS </h1>");
});

app.route('/api/students/:id')
.get((req, res) => {
    const id = req.params.id;
    let html = `<h1> all the details of student having id:${id} </h1>`;

    console.log(".get() => modified at Middleware-2", req.myUserName);    
    res.status(200).send(html);
})
.patch((req, res) => {
    res.setHeader('X-Name', "pranav");
    console.log(req.headers);
    res.status(202).end("action required for id: "+ req.params.id);
})
.delete((req, res) => {
    res.end("delete action required");
});

app.listen(PORT, ()=> {console.log(`Server start at port: ${PORT}`)});