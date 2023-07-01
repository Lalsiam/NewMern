const express = require("express");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/blogcomments");
const verifyToken = require("../verifyToken");
const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:blogId", getComments);

module.exports = router;
