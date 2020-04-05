import {
    sendResponse
} from '../helpers/response';
import likeTool from '../tools/like';
import articleTool from '../tools/article';
import commentTool from '../tools/comment';
const {
    Like
} = '../models';

export class LikeController {
    static async likeAnArticle(req, res) {
        const {
            user: {
                user_id
            },
            params: {
                id
            }
        } = req;
        try {
            const article = await articleTool.getArticleById(id);
            const foundLikes = await likeTool.getLikeOfArticle(id);
            if (foundLikes === null) {
                const likedArticle = await likeTool.likeArticle({
                        user_id,
                        article_id: id,
                        type: 'article'
                    },
                    article
                );
                return sendResponse(res, {
                    message: 'you just liked this article ',
                    data: likedArticle
                });
            }
            if (article.Likes[0].user_id === user_id) {
                article.decrement('numberOfLikes');
                await likeTool.deleteLike(foundLikes.like_id);
                return sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'you just unliked this article',
                    data: null
                });
            } else return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'no article found',
                data: null
            });
        } catch (e) {
            throw e;
        }
    }

    static async likeAComment(req, res) {
        const {
            user: {
                user_id
            },
            params: {
                id
            }
        } = req;
        try {
            const comment = await commentTool.getCommentById(id);
            const foundLikes = await likeTool.getLikeOfComment(id);
            if (foundLikes === null) {
                const likedComment = await likeTool.likeComment({
                        user_id,
                        comment_id: id,
                        type: 'comment'
                    },
                    comment
                );
                return sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'you just liked this comment ',
                    data: likedComment
                });
            } else if (foundLikes.user_id === comment.Likes[0].user_id) {
                comment.decrement('numberOfLikes');
                await likeTool.deleteLike(foundLikes.like_id);
                return sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: 'you just unliked this comment',
                    data: null
                });
            } else return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'No comment Found',
                data: null
            });

        } catch (e) {
            throw e;
        }
    }
}