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
    },
    // Array of objects (objects of time Number)
    visitHistory:[ { timestamp: {type: Number}} ],
}, 
{timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;