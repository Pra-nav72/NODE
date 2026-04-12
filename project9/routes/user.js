const express = require("express");

const { handleGetallUsers, 
    handleCreateUser, 
    handleGetUsersByName,
    handleUpdateUserByName,
    handleDeleteUserByName, } = require("../controllers/user")

// creating separate router for exports 
const router = express.Router();
 
router.route("/")
// remove '/users'
// router.get("/users", async (req, res) =>{
.get( handleGetallUsers)
// router.post("/users", async (req, res) => {
.post( handleCreateUser);


// router.route("/users/:name")
router.route("/:name")
.get(handleGetUsersByName)
.patch(handleUpdateUserByName)
.delete(handleDeleteUserByName);

module.exports = router;