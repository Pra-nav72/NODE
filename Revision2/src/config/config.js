const dotenv = require("dotenv");

// we can't acces .env variable untill config() is called.
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in environment variable");
}

if(!process.env.SECRET_KEY){
    throw new Error("SECRET_KEY is missing for JWT authentication");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRET_KEY,
}

module.exports = config;