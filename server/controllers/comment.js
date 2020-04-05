import commentTool from '../tools/comment';
import {
    sendResponse
} from '../helpers/response';
import articleTool from '../tools/article';

export class CommentController {
    static async createComment(req, res) {
        const {
            body: {
                content
            },
            user: {
                user_id
            },
            params: {
                id
            }
        } = req
        try {
            const article = await articleTool.getArticleById(id)
            if (article) {
                const createdComment = await commentTool.createComment({
                    reviewer_id: user_id,
                    content,
                    article_id: id
                }, article)
                const newComment = await commentTool.getCommentById(createdComment.comment_id)
                return sendResponse(res, {
                    statusCode: 201,
                    success: true,
                    message: 'Comment created successfully ',
                    data: newComment
                })
            }
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'No Article found ',
                data: null
            })
        } catch (e) {
            throw e
        }
    }

    static async getAComment(req, res) {
        const {
            params: {
                id
            }
        } = req
        try {
            const comment = await commentTool.getCommentById(id);
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'comment retrieved',
                data: comment
            })
        } catch (e) {
            throw e
        }
    }

    static async updateComment(req, res) {
        const {
            body: {
                content
            },
            comment
        } = req
        try {
            const updatedComment = await commentTool.updateComment(comment, {
                content
            })
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'comment updated',
                data: updatedComment
            })
        } catch (e) {
            throw e
        }
    }

    static async deleteComment(req, res) {
        const {
            id
        } = req.params

        try {
            const deletedComment = await commentTool.deleteComment(id)
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'comment deleted',
                data: deletedComment
            })
        } catch (e) {
            throw e
        }
    }
}