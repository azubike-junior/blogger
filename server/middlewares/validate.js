import {
    check,
    validationResult
} from 'express-validator'

export const validateSignup = [
    check('firstName').isLength({
        min: 1
    })
    .trim()
    .escape()
    .withMessage('First Name field is required'),
    check('lastName')
    .isLength({
        min: 1
    })
    .trim()
    .escape()
    .withMessage('Last Name field is required'),
    check('email')
    .isEmail()
    .isLength({
        min: 1
    })
    .trim()
    .escape()
    .withMessage('Email field is required'),
    check('password')
    .isLength({
        min: 8
    })
    .trim()
    .withMessage('Password must be more than 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        return next();
    }
]

export const validateSignin = [
    check('email')
    .isEmail()
    .isLength({
        min: 1
    })
    .trim()
    .escape()
    .withMessage('Email field is required'),
    check('password')
    .isLength({
        min: 8
    })
    .trim()
    .withMessage('Password must be more than 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        return next();
    }
]

export const validateArticle = [
    check("content")
    .isLength({
        min: 1
    })
    .withMessage("content cannot be empty"),
    check("description")
    .isLength({
        min: 1
    })
    .withMessage("Description cannot be empty"),
    check("heading")
    .isLength({
        min: 1
    })
    .withMessage("Heading cannot be empty"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        return next();
    }
]

export const validateComment = [
    check("content")
    .isLength({
        min: 1
    })
    .withMessage("content cannot be empty"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        return next();
    }
]