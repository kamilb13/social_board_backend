const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const userFollowersRoutes = require("./routes/userFollowersRoutes");

const port = 3000;

const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/like", likeRoutes);
app.use("/followers", userFollowersRoutes);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/avatars", express.static(path.join(__dirname, "..", "avatars")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
