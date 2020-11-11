const express = require("express");
const router = new express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/Authentication");

//create new blog
router.post("/blog", auth, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.send(blog);
  } catch (e) {
    res.status(401).send(e);
  }
});

//get all blogs
router.get("/blog", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    //console.log(blogs);
    res.send(blogs);
  } catch (e) {
    res.status(401).send(e);
  }
});

//get a particular blog by title
router.get("/blog/:title", async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.params.title });
    if (!blog) {
      throw new Error("No Such Blog Exists !");
    }
    res.send(blog);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.post("/blog/comment", async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.body.title });
    if (!blog) {
      throw new Error("No Such Blog Exists !");
    } else {
      blog.comments = blog.comments.concat({
        comment: req.body.comment,
        commenter: req.body.commenter,
      });
      await blog.save();
    }
    res.send(blog);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});
router.delete("/blog/comment", auth, async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.body.title });
    if (!blog) {
      throw new Error("No Such Blog Exists !");
    } else {
      blog.comments = blog.comments.filter((comt) => {
        return comt.comment !== req.body.comment;
      });
      await blog.save();
    }
    res.send(blog);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

//delete a particular blog by title
router.delete("/blog/:title", auth, async (req, res) => {
  try {
    const title = req.params.title;
    const blog = await Blog.findOne({ title });
    if (!blog) {
      res.status(404).send();
    }
    await blog.remove();
    res.send(blog);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
