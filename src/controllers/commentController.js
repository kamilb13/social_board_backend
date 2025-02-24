const { Comment } = require("../models");
const { Post } = require("../models");

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Komentarz nie znaleziony" });
    }

    await comment.destroy();
    res.status(200).json({ message: "Komentarz usunięty" });
  } catch (error) {
    console.error("Błąd podczas usuwania komentarza:", error);
    res.status(500).json({ message: "Błąd podczas usuwania komentarza" });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Komentarz nie znaleziony" });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "Komentarz zaktualizowany", comment });
  } catch (error) {
    console.error("Błąd podczas edytowania komentarza:", error);
    res.status(500).json({ message: "Błąd podczas edytowania komentarza" });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post nie znaleziony" });
    }

    const newComment = await Comment.create({
      postId: id,
      author,
      content,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Błąd podczas dodawania komentarza:", error);
    res.status(500).json({ message: "Błąd podczas dodawania komentarza" });
  }
};

exports.getCommentForPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post nie znaleziony" });
    }

    const comments = await Comment.findAll({
      where: { postId: id },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Błąd podczas pobierania komentarzy:", error);
    res.status(500).json({ message: "Błąd podczas pobierania komentarzy" });
  }
};
