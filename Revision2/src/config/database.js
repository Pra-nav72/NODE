const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
    await mongoose.connect(config.MONGO_URI)
    .then(()=>console.log("Connected to Database!"))
    .catch((error)=>console.log(`database connection error: ${error}`));
}

module.exports = connectDB;