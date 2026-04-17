
const {setUser} = require("../services/auth");
async function handleHomePage(req, res) {
    return res.render("home");
}

async function handleSignupPage(req, res) {
    return res.json({msg: "user created!"});
}

async function handleLoginPage(req, res) {
    const user = req.body;
    console.log(user);
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/kids");
}

async function handleGetKids(req, res) {
    return res.render("kids");
}

module.exports = {
    handleHomePage,
    handleLoginPage,
    handleSignupPage,
    handleGetKids,
}