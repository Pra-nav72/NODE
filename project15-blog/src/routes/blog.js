const express = require('express');
const {handleNewBlog, handleReadBlog} = require('../controllers/blog');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const { requireAuthentication } = require('../middlewares/authentication');



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

router.get("/add-blog", requireAuthentication, (req, res)=>{
    res.render('addBlog', {
        user: req.user
    })
});

router.post("/", requireAuthentication, upload.single('coverImage'), handleNewBlog);

router.get("/:id", handleReadBlog);

module.exports = router;