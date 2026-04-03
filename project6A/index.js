const express = require('express');
const fs = require('fs');


const app = express();
const PORT = 8000;

const users = require('./MOCK_DATA.json');

// MiddleWare
app.use(express.urlencoded({ extended: false })); //This will handle the data coming from post request.

// showing all users
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// showing all users in web browser as a html format
app.get('/users',(req, res) => {
    const html = `
    <ul>
    ${users.map((user)=>`<li> ${user.id}: ${user.first_name} </li>`).join("")}
    </ul>`;
    
    res.send(html);
})

app.post('/api/users', (req, res) => {
    // req.body contains all the data from the frontend body
    const body = req.body;

    // adding json coming from POSTMAN's post request, incrementing value of id by 1.
    users.push({...body, id: users.length + 1});

    // appending the data into the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length});
    });
});


//dynamic routing, ':userid' can be anything like :id, :num etc
// app.get('/api/users/:userid', (req, res) => {

//     // getting the userid from the request url
//     const id = Number(req.params.userid);

//     // matching the url id with the stored user details.
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })



// Since I have to use the same route '/api/users/:userid' for get, Put, Patch & Delete 
// Therefor I'll group them in such a way that we use the route only once.
app.route('/api/users/:userid')
.get((req, res) => {

    // getting the userid from the request url
    const id = Number(req.params.userid);

    // matching the url id with the stored user details.
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    const id = Number(req.params.userid);
    const body = req.body;
    
    // Find the user index to update
    const userIndex = users.findIndex((user) => user.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({status: "error", message: "User not found"});
    }
    
    // Update the user with new data
    users[userIndex] = {...users[userIndex], ...body};
    // ...users[userIndex] takes all the data of the user
    // ...body takes all the data coming from the request & then overrite the old data with new one
    // then assign back to the users[userIndex]
    
    // Write updated data back to file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Failed to update"});
        }
        return res.json({status: "success", user: users[userIndex]});
    });
})
.delete((req, res) => {
    const id = Number(req.params.userid);
    const userIndex = users.findIndex((user) => user.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({status: "error", message: "User not found"});
    }
    
    // Remove the user from array
    const deletedUser = users.splice(userIndex, 1);
    
    // Write updated data back to file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({status: "error", message: "Failed to delete"});
        }
        return res.json({status: "success", message: "User deleted", user: deletedUser[0]});
    });
});


app.listen(PORT, () => console.log(`server started at port: ${PORT}`));