const express = require('express');
const commentController = require('../controllers/comments');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/:id', jwtMiddleware, commentController.createComment);
router.patch('/:id', jwtMiddleware, commentController.updateComment);
router.delete('/:id', jwtMiddleware, commentController.deleteComment);
router.get('/:id', commentController.readComment);

module.exports = router;