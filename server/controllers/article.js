import {
    sendResponse
} from '../helpers/response'
import tools from '../tools/article'

export class ArticleController {
    static async createArticle(req, res) {
        const {
            body: {
                content,
                description,
                heading
            },
            user: {
                user_id
            }
        } = req;
        try {
            const author_id = user_id
            const newArticle = await tools.createArticle({
                content,
                description,
                heading,
                author_id
            })
            return sendResponse(res, {
                statusCode: 201,
                success: true,
                message: 'Article created successfully ',
                data: newArticle
            })
        } catch (e) {
            throw e
        }
    }

    static async getAllArticles(req, res) {
        try {
            const foundArticles = await tools.getAllArticles();
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Articles retrieved ',
                data: foundArticles
            })

        } catch (e) {
            throw e
        }
    }

    static async getAnArticle(req, res, next) {
        try {
            const articles = await tools.getAllArticles();
            const article = await tools.getArticleById(req.params.id)
            const foundArticle = articles.find(art =>
                art.aritcle_id === article.aritcle_id)
            const index = articles.indexOf(foundArticle)
            articles.splice(index, 1)
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Article retrieved ',
                data: article
            })
        } catch (e) {
            throw e
        }
    }

    static async updateArticle(req, res) {
        const {
            body: {
                content,
                description,
                heading
            },
            article
        } = req
        try {
            const updatedArticle = await tools.updateArticle(article, {
                content,
                description,
                heading
            })
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Article Updated Successfully ',
                data: updatedArticle
            })
        } catch (e) {
            throw e
        }
    }

    static async deleteArticle(req, res) {
        const {
            params: {
                id
            }
        } = req
        try {
            const deletedArticle = await tools.deleteArticle(id)
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Article deleted Successfully ',
                data: deletedArticle
            })
        } catch (e) {
            throw e
        }
    }
}