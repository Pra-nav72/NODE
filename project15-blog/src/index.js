const express = require('express');
const path = require('path');
const route  = require('./routes/user');
const blogRoute = require('./routes/blog')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//custom middleware
app.use(checkForAuthenticationCookie("token")); // token is the name of cookie

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find()
            .populate("createdBy")
            .sort({ createdAt: -1 });
            
  return res.render('home', {
    blogs: allBlogs,
  });
});

app.use('/user', route);
app.use('/blog', blogRoute);


module.exports = app;