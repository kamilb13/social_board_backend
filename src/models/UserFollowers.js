module.exports = (sequelize, DataTypes) => {
  const UserFollowers = sequelize.define(
    "UserFollowers",
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "userfollowers",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return UserFollowers;
};
