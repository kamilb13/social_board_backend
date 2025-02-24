const express = require("express");
const { likePost } = require("../controllers/likeController");

const router = express.Router();

router.post("/posts/:id", likePost);

module.exports = router;
