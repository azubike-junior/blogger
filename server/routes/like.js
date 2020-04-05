import express from 'express';
import {
    LikeController
} from '../controllers/reaction';
import {
    verifyUser
} from '../middlewares/authenticate'
const router = express.Router();

router.route('/article/:id')
    .post(verifyUser, LikeController.likeAnArticle);
router.route('/comment/:id/article')
    .post(verifyUser, LikeController.likeAComment);

export default router