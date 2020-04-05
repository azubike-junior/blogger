'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      comment_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      numberOfLikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      reviewer_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      article_id: {
        type: Sequelize.UUID,
        allowNull: false
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
    return queryInterface.dropTable('comments');
  }
};