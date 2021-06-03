const express = require('express');
const chattingController = require('../controllers/chattings');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/:id', chattingController.sendMessage);
router.get('/:id', jwtMiddleware, chattingController.readCurrentRoomChat);

module.exports = router;
