const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/blog_db"
);

const User = require("./User")(sequelize, DataTypes);
const Post = require("./Post")(sequelize, DataTypes);
const Comment = require("./Comment")(sequelize, DataTypes);
const Like = require("./Like")(sequelize, DataTypes);
const UserFollowers = require("./UserFollowers")(sequelize, DataTypes);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych połączona");
});

module.exports = { sequelize, User, Post, Comment, Like, UserFollowers };
