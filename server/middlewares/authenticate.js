import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import config from '../config/config'
import {
    sendResponse
} from '../helpers/response';
import userTool from '../tools/user';
import articleTool from '../tools/article';
import commentTool from '../tools/comment'

export const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (typeof token !== 'undefined') {
        try {
            const decoded = jwt.verify(token, config.jwtConfigs.secret);
            const user = await userTool.findUserById(decoded.user_id)
            req.user = user;
            return next();
        } catch (e) {
            throw e
        }
    }
    return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'No valid token provided',
        data: null
    })
}

export const confirmOwnerOfArticle = async (req, res, next) => {
    const {
        user: {
            user_id
        },
        params: {
            id
        }
    } = req;
    try {
        const foundArticle = await articleTool.getArticleById(id)
        if (foundArticle) {
            if (foundArticle.User.user_id === user_id) {
                req.article = foundArticle;
                return next()
            }
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: 'Unauthorized',
                data: null
            })
        }
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: 'No Article found',
            data: null
        })
    } catch (e) {
        throw e
    }
}

export const confirmCommentOwner = async (req, res, next) => {
    const {
        user: {
            user_id
        },
        params: {
            id
        }
    } = req
    try {
        const foundComment = await commentTool.getCommentById(id)
        if (foundComment) {
            if (foundComment.User.user_id === user_id) {
                req.comment = foundComment;
                return next()
            }
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: 'Unauthorized',
                data: null
            })
        }
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: 'No comment found',
            data: null
        })
    } catch (e) {
        throw e
    }
}