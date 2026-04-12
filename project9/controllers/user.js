const {User} = require("../models/user")

// GET
async function handleGetallUsers(req, res){
    const dbAllUsers = await User.find({});
    const html = `
        <ul> 
            ${dbAllUsers.map((user) => `<li> ${user.firstName} -- ${user.email} </li>`).join("")}
        </ul>
    `;
    res.status(201);
    res.send(html);
}


//POST
async function handleCreateUser(req, res) {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return req.status(400).json({msg: "all fields are required!"});
    }
    // it will return an user object
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });

    // console.log(result);
    return res.status(201).json({msg: "success"});
}


// GET(/:name)
async function handleGetUsersByName(req, res) {
    const username = req.params.name;
    const userData = await User.find({firstName: username});
    if(userData.length === 0){
        return res.status(404).json({msg: "user not found"});
    }
    return res.status(200).json(userData);
}


// PATCH(/:name)
async function handleUpdateUserByName(req, res) {
    const body = req.body;
    // finding user by NAME (should use Id)
    const userData = await User.findOne({firstName: req.params.name});
    if (!userData) {
        return res.status(404).json({ msg: "User not found" });
    }
    
    // Prepare update object with only provided fields
    const updateData = {};
    if (body.first_name) updateData.firstName = body.first_name;
    if (body.last_name) updateData.lastName = body.last_name;
    if (body.email) updateData.email = body.email;
    if (body.job_title) updateData.jobTitle = body.job_title;
    if (body.gender) updateData.gender = body.gender;
    
    const result = await User.findByIdAndUpdate(userData._id, updateData, { new: true });
    return res.status(200).json({ msg: "User updated successfully", user: result });
}


// DEETE(/:name)
async function handleDeleteUserByName(req, res) {
    const username = req.params.name;
    const isUser = await User.find({firstName:username});
    if(isUser.length === 0){
        return res.status(404).json({msg: "user not found!"});
    }
    const result = await User.deleteOne({firstName: username});
    return res.status(200).json({msg: "user deleted successfully", user: result});
}
module.exports = {
    handleGetallUsers,
    handleCreateUser,
    handleGetUsersByName,
    handleUpdateUserByName,
    handleDeleteUserByName,
};