const express = require("express");
const mongoose = require("mongoose");

const PORT = 8000;
const app = express();

// Connecting to server
mongoose.connect("mongodb://127.0.0.1:27017/Node-user-1")
.then(() => console.log("mongoDB connected!")) // promise returned
.catch((error) => console.log(`mongo error: ${error}`));

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type : String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    }
}, {timestamps: true });

// MongoDB Model
const User = mongoose.model("user", userSchema);

// middleware for postman's requests
app.use(express.urlencoded({extended:false}));

app.get("/users", async (req, res) =>{
    const dbAllUsers = await User.find({});
    const html = `
        <ul> 
            ${dbAllUsers.map((user) => `<li> ${user.firstName} -- ${user.email} </li>`).join("")}
        </ul>
    `;
    res.status(201);
    res.send(html);
});

app.post("/users", async (req, res) => {
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
});
app.route("/users/:name")
.get(async (req, res) => {
    const username = req.params.name;
    const userData = await User.find({firstName: username});
    if(userData.length === 0){
        res.status(404).json({msg: "user not found"});
    }
    res.status(200).json(userData);
})
.patch(async (req, res) => {
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
    res.status(200).json({ msg: "User updated successfully", user: result });
})
.delete(async (req, res) => {
    const username = req.params.name;
    const isUser = await User.find({firstName:username});
    if(isUser.length === 0){
        res.status(404).json({msg: "user not found!"});
    }
    const result = await User.deleteOne({firstName: username});
    res.status(200).json({msg: "user deleted successfully", user: result});
});


app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`));