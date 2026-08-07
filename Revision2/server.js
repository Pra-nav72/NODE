const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

// Server creation at port
app.listen(8000, ()=>console.log("server successfully started! port: 8000"));