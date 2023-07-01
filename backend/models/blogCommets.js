const mongoose = require("mongoose");

const BlogCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogComment = mongoose.model("Comment", BlogCommentSchema);
module.exports = BlogComment;
