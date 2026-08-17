const dotenv = require('dotenv');

dotenv.config();

if(!process.env.PORT) console.log("PORT not defined");
const PORT = process.env.PORT;

if(!process.env.MONGO_URI) console.log("MONGO_URI not defined");
const MONGO_URI = process.env.MONGO_URI;


if(!process.env.SECRET_KEY) console.log("SECRET_KEY not defined");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {PORT, MONGO_URI, SECRET_KEY}