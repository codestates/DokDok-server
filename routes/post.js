const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();
const { upload } = require('../config/s3');
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/', upload.array('image', 5), jwtMiddleware, postController.createPost);
router.patch('/:id', upload.array('image', 5), jwtMiddleware, postController.updatePost);
router.delete('/', jwtMiddleware, postController.deletePost);
router.get('/', postController.readPostList);
router.get('/search', postController.searchPost);
router.get('/user', jwtMiddleware, postController.userPostList);
router.get('/:id', postController.readDetailPost);

module.exports = router;