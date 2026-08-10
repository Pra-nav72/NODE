const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // users collection in db
        required: [true, "user is required"]
    },
    refreshTokenHash:{
        type: String,
        required: [true, "refresh token is required"]
    },
    ip:{
        type: String,
        required: [true, "ip is required"]
    },

    // contains the info. about the browser used by client
    userAgent:{
        type: String,
        required: [true, "user agent is required"]
    },
    revoked:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const sessionModel = mongoose.model("session", sessionSchema);

module.exports = sessionModel;

// while registering the user, we will create the session during token creation where we pass hash