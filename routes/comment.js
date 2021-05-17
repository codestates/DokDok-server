const express = require('express');
const commentController = require('../controllers/comments');
const router = express.Router();

router.post('/:id', commentController.createComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.get('/:id', commentController.readComment);

module.exports = router;