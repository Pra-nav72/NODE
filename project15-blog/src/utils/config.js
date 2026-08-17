const dotenv = require('dotenv');

dotenv.config();

if(!process.env.PORT) console.log("PORT not defined");
const PORT = process.env.PORT;

if(!process.env.MONGO_URI) console.log("MONGO_URI not defined");
const MONGO_URI = process.env.MONGO_URI;


module.exports = {PORT, MONGO_URI, }