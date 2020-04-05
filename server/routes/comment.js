import express from 'express';
import {
    validateComment
} from '../middlewares/validate';
import {
    CommentController
} from '../controllers/comment'
import {
    verifyUser,
    confirmCommentOwner
} from '../middlewares/authenticate'
const router = express.Router();

router.route('/:id/article')
    .get(CommentController.getAComment)
    .post(validateComment, verifyUser, CommentController.createComment)
    .put(verifyUser, confirmCommentOwner, CommentController.updateComment)
    .delete(verifyUser, CommentController.deleteComment)

export default router