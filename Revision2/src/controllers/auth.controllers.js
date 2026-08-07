const User = require("../models//user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { log } = require("console");


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

async function handleUserGetme(req, res){
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    
    if(!token){
        return res.status(401).json({
            message:"token not found"
        });
    }

    const decoded = jwt.verify(token, config.SECRET_KEY);
    
    const user = await User.findById(decoded.id);    
    res.status(200).json({
        message:`welcome ${user.username}`,
        user:{
            username:user.username,
            email:user.email
        }
    });
}
module.exports = {
    handleUserSignup,
    handleUserGetme,
}