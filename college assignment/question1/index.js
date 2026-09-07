const http = require('http');
const os = require('os');

const server = http.createServer((req, res)=>{

    // question: 1
    const operatingSystem = os.platform();
    const os_architecture = os.arch();
    const home_directory = os.homedir();
    res.end(`\n operating system: ${operatingSystem} \n architecture: ${os_architecture} \n home directory: ${home_directory}`);

})

server.listen(8000, ()=>console.log('server started: http://localhost:8000/'))