const mongoose = require("mongoose");

// Schema
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    // original URL
    redirectUrl:{
        type: String,
        required: true,
        // intetionally true
        unique: true,
    },
    // Array of objects (objects of time Number)
    visitHistory:[ { timestamp: {type: String}} ],
}, 
{timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;