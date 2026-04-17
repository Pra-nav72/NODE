
const {getUser} = require("../services/auth");
async function restrictToLoggedInUsersOnly(req, res, next) {
    // in the cookies 'uid' named session id stored
    
    const userId = req.cookies?.uid;

    if(!userId){
        console.log("userId missing");
        return res.status(404).redirect('/login');
    }

    next();
}

module.exports = {restrictToLoggedInUsersOnly};