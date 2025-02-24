const { Post } = require("../models");
const { Like } = require("../models");

exports.likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post nie znaleziony" });
    }

    const existingLike = await Like.findOne({ where: { userId, postId: id } });

    if (existingLike) {
      await existingLike.destroy();
      post.likes -= 1;
      await post.save();
      return res
        .status(200)
        .json({ message: "Like usunięty", likes: post.likes });
    } else {
      await Like.create({ userId, postId: id });
      post.likes += 1;
      await post.save();
      return res
        .status(200)
        .json({ message: "Post polubiony", likes: post.likes });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas polubienia/odlubienia postu", error });
  }
};
