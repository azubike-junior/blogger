('use strict');
module.exports = (sequelize, DataTypes) => {
	const like = sequelize.define(
		'Like', {
			like_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			user_id: {
				allowNull: false,
				type: DataTypes.UUID
			},
			type: {
				type: DataTypes.ENUM,
				values: ['article', 'comment']
			}
		}, {}
	);
	like.associate = (db) => {
		like.belongsTo(db.User, {
			foreignKey: 'user_id',
			sourceKey: 'user_id'
		});
		like.belongsTo(db.Article, {
			foreignKey: 'article_id',
			sourceKey: 'article_id'
		});
		like.belongsTo(db.Comment, {
			foreignKey: 'comment_id',
			sourceKey: 'comment_id'
		});
	};
	return like;
};