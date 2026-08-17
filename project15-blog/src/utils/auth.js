const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('./config');

function createUserToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "7d"});
    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token, SECRET_KEY);
    if(!payload) throw new Error("Token expired!");
    
    return payload
}

module.exports = {createUserToken, validateToken,};