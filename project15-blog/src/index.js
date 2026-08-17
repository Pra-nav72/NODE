const express = require('express');
const path = require('path');
const router  = require('./routes/user');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//custom middleware
app.use(checkForAuthenticationCookie("token")); // token is the name of cookie
app.get('/', (req, res) => {
  return res.render('signin')
});

app.use('/user', router);

module.exports = app;