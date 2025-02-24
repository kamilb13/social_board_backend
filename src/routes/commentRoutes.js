const express = require("express");
const {
  getCommentForPost,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.get("/posts/:id", getCommentForPost);
router.post("/posts/:id", addComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
