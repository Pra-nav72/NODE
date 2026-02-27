// we use fs(file system) module to work on files

const fs = require("fs");

// Sync....
// fs.writeFileSync("./fsTEST.txt", "this is a msg");

// reading file Sync.
const result = fs.readFileSync("./fsTEST.txt", 'utf-8');
console.log(result);

// readFile do not return result text
// const result = fs.readFile("./fsTEST.txt", 'utf-8');

// non Sync readFile is written as- 
// readFile has a callback function which has two parameters:
//      1. ERROR(if any occur)      2.RESULT
fs.readFile("./fsTEST.txt", "utf-8", (err, result) => {
    if(err){
        console.log("something wrong: ", err);
    }
    else{
        console.log("using readFile: ", result);
    }
})



// similar to readFile,
// writeFile() also expect a callback function
// writeFileSync() return  a result.

fs.appendFileSync("./fsTEST.txt", "\n added: "+ new Date().getFullYear().toLocaleString());

// to delete a file
// fs.unlinkSync("./copy.txt");

// to find the statistics of a file
const stats = fs.statSync("./fsTEST.txt");
console.log(stats);