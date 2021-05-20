const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/', jwtMiddleware, postController.createPost);
router.patch('/', jwtMiddleware, postController.updatePost);
router.delete('/', jwtMiddleware, postController.deletePost);
router.get('/', postController.readPostList);
router.get('/search', postController.searchPost);
router.get('/user', jwtMiddleware, postController.userPostList);
router.get('/:id', postController.readDetailPost);

module.exports = router;