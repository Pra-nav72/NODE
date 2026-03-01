const http = require('http');
const fs = require('fs');

//after installing a dependency for url parsing [npm i url]
const url = require("url");

const myServer = http.createServer((req, res) =>{
    if(req.url === '/favicon.ico' || req.url === '/.well-known') return res.end();

    // parsing the query parameter from the req.url
    // const myUrl = url.parse(req.url);
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    let log = `${Date.now()} ${req.url} : new req. received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        if (err) {
            console.log("Error: ", err);
        }
        else{
            //checking whole url i.e along with query parameters
            switch(myUrl.pathname){
                // different response based on the user request(url).
                case "/":
                    res.end("welcome to home Page.");
                    break;
                case "/about":
                    // showing result a/q to query parameters
                    const username = myUrl.query.name;
                    res.end(`hello! ${username} welcome...`);
                    break;
                case "/contact":
                    res.end("<h1>+91 9988776655");
                    break;
                default:
                    res.end("404 Not Found!");
            }
        }
        
    });
});

myServer.listen(8000, () => {console.log("server started!")});