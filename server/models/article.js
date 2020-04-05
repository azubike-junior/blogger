'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('Article', {
    article_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    heading: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    numberOfComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numberOfLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {});
  article.associate = db => {
    article.belongsTo(db.User, {
      foreignKey: 'author_id',
      sourceKey: 'user_id'
    })
    article.hasMany(db.Comment, {
      foreignKey: 'article_id',
      sourceKey: 'article_id'
    });
    article.hasMany(db.Like, {
      foreignKey: 'article_id',
      sourceKey: 'article_id'
    })
  };
  return article;
};