module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      freezeTableName: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
