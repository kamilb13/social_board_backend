const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");

const JWT_SECRET = "twoj_sekretny_klucz";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).send("Username, e-mail i hasło są wymagane!");
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .send("Użytkownik o tym emailu lub username już istnieje!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send({ message: "Użytkownik zarejestrowany!" });
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    res.status(500).send("Błąd rejestracji");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email i hasło są wymagane!");
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send("Nie znaleziono użytkownika!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Niepoprawne hasło!");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, avatar: user.avatar },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      message: "Zalogowano pomyślnie!",
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error("Błąd logowania:", error);
    res.status(500).send("Błąd logowania");
  }
};
