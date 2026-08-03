const {validateUser, validateName, validateEmail, validatePassword} = require("../Validation/User");
const User = require("../Models/User");

async function handleSignUpUser(req, res) {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    
    if(validateUser(name, email, password)){
       await User.create({name, email, password});
       res.send({"user added": name});
    }
    else{
        res.send("Name, email, Password is not valid");
    }
}

async function handleLoginUser(req, res){
    let {email, password} = req.body;
    email = email.trim();
    if(validatePassword(password) && validateEmail(email)){
        const userInDb = await User.findOne({email, password});
        if( userInDb != null)
            res.send(`${userInDb.name} is logging in...`);
        else
            res.send("user not found!");
    }
    else{

        res.send("incorrect name or email");
    }
}

module.exports = {handleSignUpUser, handleLoginUser};