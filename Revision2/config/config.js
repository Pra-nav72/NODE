const dotenv = require("dotenv");

// we can't acces .env variable untill config() is called.
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI
}

module.exports = config;