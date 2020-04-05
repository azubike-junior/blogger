import express from 'express';
import {
    ArticleController
} from '../controllers/article'
import {
    validateArticle
} from '../middlewares/validate';
import {
    verifyUser,
    confirmOwnerOfArticle
} from '../middlewares/authenticate'
const router = express.Router();

router.route('/')
    .post(validateArticle, verifyUser, ArticleController.createArticle)
    .get(ArticleController.getAllArticles)

router.route('/:id')
    .get(ArticleController.getAnArticle)
    .put(verifyUser, confirmOwnerOfArticle, ArticleController.updateArticle)
    .delete(verifyUser, ArticleController.deleteArticle)

export default router