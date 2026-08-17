const express = require('express');
const User = require('../models/user');

async function handleUserSignup(req, res) {
    const {username, gender, email, password, role} = req.body;

    const userExist = await User.findOne({email});
    if(!userExist){
        await User.create({username, gender, email, password, role});
    }
    return res.redirect('/');

}


async function handleUserSignin(req, res) {
    const {email, password} = req.body;
    
    /**
     * first we need to create hash password using user's already stored salt field in DB & compare it with user's stored hashedPassword.
     * 
     * for this we use mongoose virtual function.
    */
   
   const user = User.matchPassword(email, password);
   console.log("1", user);
   
   if(user){
        res.redirect('/')
   }
    else if(user==='undefined'){
    res.status(404).json({'message':'passord incorrect'})
   }
}


module.exports={
    handleUserSignup,
    handleUserSignin,
}