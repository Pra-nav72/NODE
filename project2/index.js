const http = require('http');
const fs = require("fs");


// const os = require('os');
// console.log(os.cpus().length);  //-----> gives no. of cores my cpu have

const myServer = http.createServer((req, res) => {
    // console.log("new req received");
    // headers contain extra information of the request
    // console.log(req.headers);

    //create log file for request
    const log = `${Date.now()}: ${req.url} :new req. recieved \n`;

    fs.appendFile("log.txt", log, (err, data) =>{
        if (err){
            console.log(err);
        }
        else{
            res.end("hello from the server");
        }
    });
});

// server will run on the port: 8000;
// the callback function will execute if the server runs successfully!
myServer.listen(8000, () => {console.log("server started")}); 