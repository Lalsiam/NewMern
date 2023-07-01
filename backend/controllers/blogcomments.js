const { createError } = require("../error.js");
const Comment = require("../models/blogComment.js");
const Blog = require("../models/Post.js");

const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports = { addComment, getComments };
