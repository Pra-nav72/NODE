
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

async function handleReadBlog(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    res.render("blog-details", { blog });
}

module.exports = {
    handleNewBlog,
    handleReadBlog,
}