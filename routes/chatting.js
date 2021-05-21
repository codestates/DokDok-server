const express = require('express');
const chattingController = require('../controllers/chattings');
const router = express.Router();

router.post('/:id', chattingController.sendMessage);
router.get('/:id', chattingController.readCurrentRoom);

module.exports = router;