const http = require('http');
const EventEmitter  = require('events');

const eventEmitter = new EventEmitter();
const server = http.createServer((req, res)=>{

    // question: 3

    // event created
    eventEmitter.on('studentRegistered', (name)=>{
        res.end(`A student named ${name} has been registered successfully!`)
    });

    // emitting an event
    eventEmitter.emit('studentRegistered', 'Pranav Kumar');

})

server.listen(8000, ()=>console.log('server started: http://localhost:8000/'))