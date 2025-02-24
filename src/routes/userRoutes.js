const express = require("express");
const path = require("path");
const router = express.Router();

const {
  getUserFromUsername,
  uploadAvatar,
  searchUsers,
} = require("../controllers/userController");

const multer = require("multer");

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: avatarStorage });

router.get("/username/:username", getUserFromUsername);
router.post("/avatar/:id", upload.single("image"), uploadAvatar);
router.get("/search", searchUsers);

module.exports = router;
