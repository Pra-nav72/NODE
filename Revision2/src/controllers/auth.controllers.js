const User = require("../models//user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { log } = require("console");
const sessionModel = require('../models/session.model')

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

    // creating refresh token(jwt)
    const refreshToken = jwt.sign({
        id: user._id
    }, config.SECRET_KEY,{
        expiresIn: "15d"
    });

    // create refreshTokenHash to prevent theft during DB get hacked
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    // maintain session
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })


    // creating access token(jwt) for authenction
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    },config.SECRET_KEY,
    {
        expiresIn: "15m" //1h - hour
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

    // check revoked status to create the access token
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    // either refresh token is wrong or revoke is true
    if(!session){
        res.status(401).json({
            message: "refresh token is invalid!"
        })
    }

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

    // update session in session DB after creating new refresh token
    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
    session.refreshTokenHash = newRefreshTokenHash; //session already created at line 109
    await session.save();

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

async function handleUserLogout(req, res){
    // get cookie
    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message: "refresh token not found!"
        })
    }

    // hashing refresh token to match with stored refresh token in session 
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    // get session data using encrypted refresh token and revoked status
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    });

    if(!session){
        return res.status(400).json({
            message: "Invalid refresh token!"
        })
    }

    // when revoked = true; the access token will not be generated using refresh token
    // in refresh token func. we need to get revoked data, based on which we'll create refresh/access token
    session.revoked = true
    await session.save();  // save the session back to database

    // clear the cookie to remove the refresh token
    res.clearCookie("refreshToken");
    res.status(200).json({
        message: "logged out succesfully"
    })
}
module.exports = {
    handleUserSignup,
    handleUserGetme,
    handleUserRefreshToken,
    handleUserLogout,
}