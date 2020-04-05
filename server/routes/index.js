import express from 'express'
import authRouter from './auth'
import articleRouter from './article'
import commentRouter from './comment'
import likeRouter from './like'

const router = express.Router();

router.use('/auth', authRouter)
router.use('/article', articleRouter)
router.use('/comment', commentRouter)
router.use('/like', likeRouter)


export default router