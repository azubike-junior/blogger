import models from '../models'
import {
    generateToken
} from '../helpers/jwt'
import {
    sendResponse
} from '../helpers/response'
import {
    hashPassword,
    comparePassword
} from '../helpers/encrypt'

const {
    User
} = models

export class UserController {
    static async signupUser(req, res, next) {
        const {
            firstName,
            lastName,
            email,
            isAdmin
        } = req.body
        try {
            const foundUser = await User.findAll({
                where: {
                    email
                }
            })
            if (foundUser.length > 0) {
                return sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Email has been used',
                    data: null
                })
            }
            const newUSer = await User.create({
                firstName,
                lastName,
                email,
                password: hashPassword(req.body.password),
                isAdmin
            })
            const {
                password,
                ...user
            } = newUSer.dataValues;

            const token = generateToken(user);
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'User registered successfully',
                data: token
            })
        } catch (e) {
            throw e;
        }
    }

    static async signinUser(req, res) {
        const {
            email,
            password
        } = req.body;
        try {
            const foundUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!foundUser) {
                return sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'invalid login credentials',
                    data: null
                })
            }
            const user = foundUser.get('password')
            const isMatch = await comparePassword(password, user)
            if (isMatch) {
                const token = generateToken(user)
                return sendResponse(res, {
                    statusCode: 201,
                    success: true,
                    message: 'login successfully',
                    data: token
                })
            }
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'invalid login credentials',
                data: null
            })
        } catch (e) {
            throw e
        }
    }

    static async getUserProfile(req, res) {
        const {
            user: {
                user_id
            }
        } = req
        try {
            const foundUser = await User.findOne({
                where: {
                    user_id
                }
            })
            if (foundUser) {
                return sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'User Profile Retrieved',
                    data: foundUser
                })
            }
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'User Profile does not exist',
                data: null
            })
        } catch (e) {
            throw e
        }
    }
}