const express = require('express');
const chattingController = require('../controllers/chattings');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.get('/', jwtMiddleware, chattingController.readRoomList);
router.post('/', jwtMiddleware, chattingController.createRoom);
router.patch('/:id', jwtMiddleware, chattingController.deleteRoom);

module.exports = router;
