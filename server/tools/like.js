import models from '../models';

const {
    Like,
    Article,
    User,
    Comment
} = models;

const likeArticle = async (like, article) => {
    article.increment('numberOfLikes')
    return Like.create(like);
}

const likeComment = async (like, comment) => {
    comment.increment('numberOfLikes');
    return Like.create(like)
}

const getLikeOfArticle = async (article_id) => {
    return await Like.findOne({
        where: {
            article_id
        },
        include: [{
            model: User,
            attributes: ['user_id']
        }],
        include: [{
            model: Article,
            attributes: ['article_id']
        }]
    })
}

const getLikeOfComment = async (comment_id) => {
    return await Like.findOne({
        where: {
            comment_id
        },
        include: [{
            model: User,
            attributes: ['user_id']
        }],
        include: [{
            model: Comment,
            attributes: ['comment_id']
        }]
    })
}

const deleteLike = async (like_id) => {
    return await Like.destroy({
        where: {
            like_id
        }
    })
}

export default {
    likeArticle,
    likeComment,
    getLikeOfArticle,
    getLikeOfComment,
    deleteLike
}