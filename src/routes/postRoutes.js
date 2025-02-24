const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const postController = require("../controllers/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", postController.getAllPosts);
router.get("/user/:userId", postController.getPostsByUser);
router.post("/", upload.single("image"), postController.addPost);
router.put("/:id", upload.single("image"), postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
