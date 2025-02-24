module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Please provide a valid email address",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      freezeTableName: true,
      timestamps: true,
    }
  );

  User.belongsToMany(User, {
    as: "following",
    through: "userfollowers",
    foreignKey: "followerId",
    otherKey: "followedId",
    timestamps: false, // Dodatkowe wyłączenie dla tej relacji
  });

  User.belongsToMany(User, {
    as: "followers",
    through: "userfollowers",
    foreignKey: "followedId",
    otherKey: "followerId",
    timestamps: false, // Dodatkowe wyłączenie dla tej relacji
  });

  return User;
};
