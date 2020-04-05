import models from '../models';

const {
    User,
    Article,
    Comment,
    Like
} = models;

const createComment = async (comment, article) => {
    await article.increment('numberOfComments')
    return await Comment.create(comment)
}

const getCommentById = async (id) => {
    return await Comment.findOne({
        where: {
            comment_id: id
        },
        include: [{
            model: User,
            attributes: ['user_id', 'email', 'firstName']
        }],
        include: [{
            model: Like,
            attributes: ['user_id', 'article_id', 'comment_id', 'type']
        }]
    })
}

const getAllArticleComments = async (article_id) => {
    return await Comment.findAll({
        where: {
            article_id
        },
        include: [{
                model: User,
                attributes: ['user_id', 'email', 'firstName']
            },
            {
                model: Article,
                include: [{
                    model: User,
                    attributes: ['user_id', 'email', 'firstName']
                }]
            }, {
                model: Like,
                attributes: ['user_id', 'article_id', 'comment_id']
            }
        ]
    })
}

const updateComment = async (comment, update) => {
    comment.content = update.content || comment.content
    await comment.save();
    await comment.reload();
    return comment;
}

const deleteComment = async (comment_id) => {
    return await Comment.destroy({
        where: {
            comment_id
        }
    })
}

export default {
    createComment,
    getCommentById,
    getAllArticleComments,
    updateComment,
    deleteComment
}