const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/signup', userController.signup);
router.get('/', userController.userinfo);
router.patch('/', userController.updateUserinfo);
router.patch('/withdrawal', userController.withdrawal);
router.post('/google', userController.googleLogin);
router.post('/kakao', userController.kakaoLogin);
router.post('/naver', userController.naverLogin);

module.exports = router;
