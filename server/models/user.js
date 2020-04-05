'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {});
  user.associate = (db) => {
    user.hasMany(db.Article, {
      foreignKey: 'author_id',
      sourceKey: 'user_id',
    });
    user.hasMany(db.Comment, {
      foreignKey: 'reviewer_id',
      sourceKey: 'user_id',
    })
    user.hasMany(db.Like, {
      foreignKey: 'user_id',
      sourceKey: 'user_id'
    })
  };
  return user;
};