const {User} = require("../models/index");
const {v4: uuidv4} = require("uuid");
const {getUser, setUser} = require("../services/auth");

async function handleHome(req, res) {
    return res.render("home");
}

async function handleCreateUser(req, res) {
    const body = req.body;
    if(!body.first_name ||
        !body.email ||
        !body.mobile ||
        !body.password
    ){
        return res.status(400).json({msg: "user info required!"});
    }
    const user = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        mobile: body.mobile,
        password: body.password
    }).catch((error)=>res.end(`something went wrong! ${error}`));

    res.status(201)
    return res.redirect("/users");
}

async function handleGetUser(req, res) {
    const user = await User.find()
    .catch((error) => res.status(404).end("User not found!", error));
    
    return res.render("usersDetail",{user:user});
}

async function handleLoginUser(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password})
    .catch((error)=>res.status(404).end("User not Found!",error));

    if(!user){
        return res.render("login", {error: "invalid email or password"});
    }

    // if everything is alright, then we'll create a session
    const sessionId = uuidv4();
    
    // mapped the current user with a session id generated randomly
    setUser(sessionId, user);

    // set cookie
    res.cookie("uid", sessionId); // we can set any name(uid)
    return res.redirect("/users");

}

module.exports= {
    handleHome,
    handleCreateUser,
    handleGetUser,
    handleLoginUser,
}