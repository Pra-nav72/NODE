const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 8000;

// enabling cors to handle cross origin operations
app.use(cors());
// used to parse json
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send('use /student api-endpoint to get students data')
});

app.get('/students', (req, res)=>{
    res.status(200).json({
        message: "student details fetched successfully!",
        students: [{
            name: "pranav",
            age: 22,
            course: "MCA",
            College: "DYPIMCAM"
        },
        {
            name: "shanu",
            age: 21,
            course: "MBA",
            College: "DYPIMCAM"
        }]
    });
});

app.listen(PORT, ()=>console.log(`server started: http://localhost:${PORT}/`))