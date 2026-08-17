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
    const user = req.body();
}


module.exports={
    handleUserSignup,
    handleUserSignin,
}