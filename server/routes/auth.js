import express from 'express';
import {
    UserController
} from '../controllers/user'
import {
    validateSignup,
    validateSignin
} from '../middlewares/validate'
import {
    verifyUser
} from '../middlewares/authenticate'

const router = express.Router()

router.post('/signup', validateSignup, UserController.signupUser);

router.post('/signin', validateSignin, UserController.signinUser)

router.get('/user', verifyUser, UserController.getUserProfile)

export default router;