'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      like_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      comment_id: {
        type: Sequelize.UUID
      },
      article_id: {
        type: Sequelize.UUID
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['comment', 'article']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};