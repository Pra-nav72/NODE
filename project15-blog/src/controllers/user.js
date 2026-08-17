const express = require('express');
const User = require('../models/user');
const { trusted } = require('mongoose');

async function handleUserSignup(req, res) {
    const {username, gender, email, password, role} = req.body;

    const userExist = await User.findOne({email});
    if(!userExist){
        await User.create({username, gender, email, password, role});
    }
    return res.render('signin');

}


async function handleUserSignin(req, res) {
    const {email, password} = req.body;
    
    /**
     * first we need to create hash password using user's already stored salt field in DB & compare it with user's stored hashedPassword.
     * 
     * for this we use mongoose virtual function.
    */
   try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        
        res.cookie('token', token)
        return res.render('home', {user: req.user});
   } catch (error) {
        res.render('signin', {
            error: 'Incorrect Email or Password'
        })
   }
}


async function handleUserLogOut(req, res) {
    return res.clearCookie('token').render('signin');
}

module.exports={
    handleUserSignup,
    handleUserSignin,
    handleUserLogOut,
}