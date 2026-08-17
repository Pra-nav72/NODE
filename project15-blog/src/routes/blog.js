const express = require('express');
const {handleNewBlog} = require('../controllers/blog');
const router = express.Router();
const multer = require('multer');
const path = require('path')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename);
  }
})

const upload = multer({ storage: storage })

router.get("/add-blog", (req, res)=>{
    res.render('addBlog', {
        user: req.user
    })
});

router.post("/",upload.single('coverImage'), handleNewBlog);

module.exports = router;