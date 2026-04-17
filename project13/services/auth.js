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
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }catch(error){
        console.error(`Invalid Token: ${error}`);
        return null;
    }
}
module.exports = {setUser, getUser};