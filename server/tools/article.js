import models from '../models';

const {
	User,
	Article,
	Comment,
	Like
} = models;

const createArticle = async (article) => {
	return await Article.create(article);
};

const getArticleById = async (article_id) => {
	return await Article.findOne({
		where: {
			article_id
		},
		include: [{
				model: User,
				attributes: ['user_id', 'email', 'firstName', 'lastName']
			},
			{
				model: Comment,
				attributes: ['reviewer_id', 'comment_id', 'content']
			},
			{
				model: Like,
				attributes: ['like_id', 'user_id', 'article_id', 'comment_id']
			}
		]
	});
};

const getAllArticles = async () => {
	return await Article.findAll({
		include: [{
				model: User,
				attributes: ['user_id', 'email', 'firstName', 'lastName']
			},
			{
				model: Comment,
				include: [{
					model: User,
					attributes: ['user_id', 'email', 'firstName', 'lastName']
				}]
			},
			{
				model: Like,
				attributes: ['user_id', 'article_id']
			}
		]
	});
};

const updateArticle = async (article, update) => {
	article.content = update.content || article.content;
	article.description = update.description || article.description;
	article.heading = update.heading || article.heading;
	await article.save();
	await article.reload();
	return article;
};

const deleteArticle = async (article_id) => {
	return await Article.destroy({
		where: {
			article_id
		}
	});
};

export default {
	createArticle,
	getArticleById,
	getAllArticles,
	updateArticle,
	deleteArticle
};