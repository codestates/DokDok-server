const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();
const { upload } = require('../config/s3');
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/login', userController.login);
router.post('/logout', jwtMiddleware, userController.logout);
router.post('/signup', userController.signup);
router.get('/', jwtMiddleware, userController.userinfo);
router.patch('/', upload.single('profileImage'), jwtMiddleware, userController.updateUserinfo);
router.patch('/withdrawal', jwtMiddleware, userController.withdrawal);

router.get('/google/login', userController.googleLogin);
router.get('/google/callback', userController.googleCallback);
router.get('/kakao/login', userController.kakaoLogin);
router.get('/kakao/callback', userController.kakaoCallback);
router.get('/kakao/userinfo', userController.kakaoUserinfo);
router.get('/naver/login', userController.naverLogin);
router.get('/naver/callback', userController.naverCallback);

module.exports = router;
