const jwt = require("jsonwebtoken");
const secret = "Prnv@@##7772kumar";
async function setUser(user) {
    const payload ={
        id: user,
        name: "pranav",
    };
    return jwt.sign(payload, secret, {expiresIn: '1hr'});
}


async function getUser(token) {
    return jwt.verify(token, secret);
}
module.exports = {setUser, getUser};