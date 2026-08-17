const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required!"]
    },
    gender:{
        type: String,
        enum: ["male", "female", "other"],
        required: [true, 'gender is required!']
    },
    email:{
        type: String,
        required:[true, "email is required!"],
        unique: [true, "email already used!"]
    },
    salt:{              // for hashing password
        type: String,
    },
    profileImageURL:{
        type: String,
        default: '/images/man-avatar.png'
    },
    password:{
        type: String,
        required: [true, "password is required!"]
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, {timestamps: true});

userSchema.pre('save', function (next){
    const user = this;
    // hashing password before saving in DB
    if(!user.isModified('password')) return;

    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    // avatar based on gender
    if (user.isModified("gender") || !user.profileImageURL) {
        if (user.gender === "male") {
            user.profileImageURL = "/images/man-avatar.png";
        } else if (user.gender === "female") {
            user.profileImageURL = "/images/woman-avatar.png";
        } else {
            user.profileImageURL = "/images/man-avatar.png";
        }
    }

    next;
})

// mongoose virtual function comparing password(signin) /w hashedPassword(signup)
userSchema.static('matchPassword', async function (email, password) {

    // find user using login credential(email: unique)
    const user = await this.findOne({email})
    if(!user) throw new Error('user not found!');

    // find salt and password of the user that already exists
    const salt = user.salt;
    const hashedPassword = user.password;

    // create hash password using login credentials(password)
    const userProvidedHash = crypto.createHmac('sha256', salt).update(password).digest('hex');

    
    // compare the existed user password /w login credentials 
    if(userProvidedHash !== hashedPassword) throw new Error("Incorrect password");
        

    // if password matched return the user & remove unnecessary informations
    return user;
});


// creating model
const user = mongoose.model("User", userSchema);

module.exports= user;