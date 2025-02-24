const { User } = require("../models");
const Sequelize = require("sequelize");

exports.getUserFromUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: {
        username: {
          [Sequelize.Op.iLike]: username,
        },
      },
      attributes: ["id", "username", "email", "avatar", "createdAt"],
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }
  } catch (error) {
    console.error("Błąd serwera:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.uploadAvatar = async (req, res) => {
  const { id } = req.params;
  const image = req.file ? req.file.filename : null;

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }
    user.avatar = image;
    await user.save();
    res.status(200).json({ message: "Avatar zaktualizowany", avatar: image });
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dodawania postu", error });
  }
};

exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.iLike]: `%${query}%`,
        },
      },
      attributes: ["id", "username", "email"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Błąd wyszukiwania:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
