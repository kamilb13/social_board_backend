const { User } = require("../models");

exports.followUser = async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);

    if (!follower || !followed) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    await follower.addFollowing(followed);

    res.status(200).json({
      message: `${follower.username} teraz obserwuje ${followed.username}`,
    });
  } catch (error) {
    console.error("Błąd podczas obserwowania użytkownika:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.unfollowUser = async (req, res) => {
  const { followerId, followedId } = req.body;

  try {
    const follower = await User.findByPk(followerId);
    const followed = await User.findByPk(followedId);

    if (!follower || !followed) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    await follower.removeFollowing(followed);

    res.status(200).json({
      message: `${follower.username} przestał obserwować ${followed.username}`,
    });
  } catch (error) {
    console.error("Błąd podczas przestania obserwowania użytkownika:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: "followers",
        attributes: ["id", "username"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    res.status(200).json(user.followers);
  } catch (error) {
    console.error("Błąd podczas pobierania followersów:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: "following",
        attributes: ["id", "username"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    res.status(200).json(user.following);
  } catch (error) {
    console.error("Błąd podczas pobierania obserwowanych:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
