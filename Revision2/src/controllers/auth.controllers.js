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

    // creating access token(jwt) for authenction
    const accessToken = jwt.sign({
        id: user._id
    },config.SECRET_KEY,
    {
        expiresIn: "15m" //1h - hour
    });

    // creating refresh token(jwt)
    const refreshToken = jwt.sign({
        id: user._id
    }, config.SECRET_KEY,{
        expiresIn: "15d"
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7days
    })


    res.status(201).json({
        message: "you signed up successfully",
        user:{
            username: user.username,
            email: user.email
        },
        accessToken
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

async function handleUserRefreshToken(req, res){
    const refreshToken = req.cookies?.refreshToken;

    // if user don't have refresh token
    if(!refreshToken){
        res.status(401).json({
            message: "refresh token not found!"
        });
    }

    // if they have refresh token then we get the user.id from it and generate new access token
    const decoded = jwt.verify(refreshToken, config.SECRET_KEY);

    const accessToken = jwt.sign({
        id: decoded.id}, config.SECRET_KEY, {
            expiresIn: "15min"
        }
    );

    // for additional security we also generate new refresh token and set it in cookie.
    const newRefreshToken = jwt.sign({
        id: decoded.id}, config.SECRET_KEY, {
            expiresIn: "7d"
        }
    );
    // set newRefreshToken to cookie having refreshToken
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    });


    res.status(200).json({
        message: "access token refreshed successfully",
        accessToken
    });
}
module.exports = {
    handleUserSignup,
    handleUserGetme,
    handleUserRefreshToken,
}