
const Blog = require('../models/blog');


async function handleNewBlog(req, res) {    
    const {title, body, coverImage} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user.id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}

module.exports = {
    handleNewBlog,
}