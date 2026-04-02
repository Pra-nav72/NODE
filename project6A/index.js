const express = require('express');

const app = express();
const PORT = 8000;

const users = require('./MOCK_DATA.json');

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
    // TODO: create a new user
    return res.json({status: "Pending"});
})


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
    // TODO: Update the user with id
    return res.json({status: "Pending"});
})
.delete((req, res) => {
    // TODO: delete the user with id
    return res.json({status: "Pending"});
});


app.listen(PORT, () => console.log(`server started at port: ${PORT}`));