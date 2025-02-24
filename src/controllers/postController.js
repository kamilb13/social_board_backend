const { Post, User, Comment } = require("../models");

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post nie znaleziony" });
    }

    post.content = content || post.content;
    if (image) {
      post.image = image;
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas edycji posta", error });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (post) {
      // Delete all comments associated with the post
      await Comment.destroy({ where: { postId: id } });

      // Now, delete the post
      await post.destroy();
      res.status(200).json({ message: "Post został pomyślnie usunięty" });
    } else {
      res.status(404).json({ message: "Post nie znaleziony" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd podczas usuniecia post" });
  }
};

exports.addPost = async (req, res) => {
  const { author, content } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log(req.file);

  try {
    const newPost = await Post.create({
      author,
      content,
      image,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dodawania postu", error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas pobierania postów" });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const posts = await Post.findAll({
      where: { author: user.username },
    });

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas pobierania postów użytkownika", error });
  }
};
