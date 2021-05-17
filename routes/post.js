const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();

router.post('/', postController.createPost);
router.patch('/', postController.updatePost);
router.delete('/', postController.deletePost);
router.get('/', postController.readPostList);
router.get('/search', postController.searchPost);
router.get('/user', postController.userPostList);
router.get('/:id', postController.readDetailPost);

module.exports = router;