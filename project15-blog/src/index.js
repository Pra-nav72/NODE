const express = require('express');
const path = require('path');
const router  = require('./routes/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/user', router);

module.exports = app;