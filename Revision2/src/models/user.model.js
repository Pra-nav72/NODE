const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"]
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already used"]
    },
    password:{
        type: String,
        required: [true, "password is required"],
    }
}, {timeStamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;