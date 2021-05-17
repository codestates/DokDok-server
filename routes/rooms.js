const express = require('express');
const chattingController = require('../controllers/chattings');
const router = express.Router();

router.post('/', chattingController.createRoom);
router.patch('/:id', chattingController.deleteRoom);
router.get('/', chattingController.readRoomList);

module.exports = router;