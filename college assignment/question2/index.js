const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{

    // question: 2
    const student = 'Name: Pranav k \n college: DYP \n course: MCA \n semester: 3'

    // writing in file
    fs.writeFile('student.txt', student, (err)=>console.log(err));

    // reading the file data
    fs.readFile('student.txt', 'utf-8', (err, data)=>{
        if (!err) {
            res.end(data);
        }
        else{
            res.end(err.message());
        }
    })

})

server.listen(8000, ()=>console.log('server started: http://localhost:8000/'))