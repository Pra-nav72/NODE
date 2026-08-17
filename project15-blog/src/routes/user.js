const express = require('express')
const {handleUserSignup, handleUserSignin, handleUserLogOut} = require('../controllers/user')


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

module.exports = router;