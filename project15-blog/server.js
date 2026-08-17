const app = require("./src/index");
const connectDB = require('./src/utils/database');
const {PORT, MONGO_URI} = require("./src/utils/config")


// mongo Database connection
connectDB(MONGO_URI)
.then(()=>console.log('database connection succesfull'))
.catch((error)=>console.log('database connection error: ', error));


app.listen(PORT || 8000, ()=>console.log(`served at http://localhost:${PORT}/`));