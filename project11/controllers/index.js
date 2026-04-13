const path = require("path");
const student = [{
    name: "pranav",
    college: "DY Patil institute of MCA & Management",
    roll: 168,
    division: "C",
    skills: ["Python", "java", "javascript", "node.js", "typescript"]
},
{
    name: "shanu",
    college: "BR Ambedkar college ",
    roll: 8,
    division: "A",
    skills: ["java", "c++", "marketing", "english"]
}];
async function handleGet(req, res) {
    return res.render("home", {student : student});
}

module.exports = handleGet;