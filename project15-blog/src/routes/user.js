const express = require('express')
const {handleUserSignup, handleUserSignin, handleUserLogOut, handleUserProfile} = require('../controllers/user')


const router = express.Router();

router.get("/signup", (req, res)=>{
    res.render('signup')
});

router.get("/signin", (req, res)=>{
    res.render('signin')
});


router.get('/logOut', handleUserLogOut);
router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);


// user profile
router.get('/profile', handleUserProfile);


module.exports = router;