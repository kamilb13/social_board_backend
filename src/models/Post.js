module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "posts",
      freezeTableName: true,
    }
  );

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments", // You can change this alias if needed
    });
  };

  return Post;
};
