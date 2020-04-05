'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'Comment', {
      comment_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      numberOfLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      reviewer_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      article_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {}
  );
  comment.associate = (db) => {
    comment.belongsTo(db.User, {
      foreignKey: 'reviewer_id'
    });
    comment.belongsTo(db.Article, {
      foreignKey: 'article_id'
    })
    comment.hasMany(db.Like, {
      foreignKey: 'comment_id',
      sourceKey: 'comment_id'
    })
  };
  return comment;
};