const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/login', userController.login);
router.post('/logout', jwtMiddleware, userController.logout);
router.post('/signup', userController.signup);
router.get('/', jwtMiddleware, userController.userinfo);
router.patch('/', jwtMiddleware, userController.updateUserinfo);
router.patch('/withdrawal', jwtMiddleware, userController.withdrawal);
router.get('/google/callback', userController.googleLogin);
router.get('/kakao/callback', userController.kakaoLogin);
router.get('/naver/callback', userController.naverLogin);

module.exports = router;
