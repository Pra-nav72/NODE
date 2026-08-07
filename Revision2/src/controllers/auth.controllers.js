const User = require("../models//user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function handleUserSignup(req, res) {
    const {username, email, password} = req.body;
    
    const userExist = await User.findOne({email});
    
    if(userExist){
        res.status(409).json({
            message: "email already exist"
        });
    }

    // hashing password using inbuilt module crypto
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // creating user
    const user = await User.create({username, email, password:hashedPassword});

    // creating token(jwt) for authenction
    const token = jwt.sign({
        id: user._id
    },config.SECRET_KEY,
    {
        expiresIn: "1d" //1h - hour
    });

    res.status(201).json({
        message: "you signed up successfully",
        user:{
            username: user.username,
            email: user.email
        },
        token
    })
}

module.exports = {
    handleUserSignup,
}