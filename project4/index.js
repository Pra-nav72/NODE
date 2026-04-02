const http = require('http');
const fs = require('fs');

// from the installed url package(third party)
const url = require('url');

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    // ignoring useless browser request
    if(myUrl.path === '/favicon.ico'){
       return res.end();
    }

    // formating date & time
    let now = new Date();
    let istString = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium", // or "full", "short"
        timeStyle: "medium"
    });

    let log = `${istString} method: ${req.method} path: ${myUrl.path}: requested\n`
    fs.appendFile('meta.txt', log, (err, data) =>{
        if(err){
            console.log("something went wrong in file");
        }
    });
    if(req.method === 'GET'){
        if(req.url === '/'){
            res.end("welcome to home page");
        }
        else if(req.url === '/about'){
            res.end("<h1>This is about page</h1>");
        }
        else{
            res.end(`welcome to ${req.url} page.`);
        }
    }
    else{
        res.end("different http method used!");
    }
});

myServer.listen(8000, ()=>{
    console.log("server started!");
})