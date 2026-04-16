const {User} = require("../models/index");

async function handleHome(req, res) {
    // const data = await User.find({});
    // if(data.length === 0){
    //     return res.status(404).json({msg: "user not found"});
    // }
    return res.render("home");
}

async function handleCreateUser(req, res) {
    const body = req.body;
    if(!body.first_name ||
        !body.email ||
        !body.mobile
    ){
        return res.status(400).json({msg: "user info required!"});
    }
    const user = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        mobile: body.mobile
    }).catch((error)=>res.end(`something went wrong! ${error}`));

    res.status(201)
    return res.redirect("/users");
}

async function handleGetUser(req, res) {
    const user = await User.find()
    .catch((error) => res.status(404).end("User not found!", error));
    
    return res.render("usersDetail",{user:user});
}

module.exports= {
    handleHome,
    handleCreateUser,
    handleGetUser,
}