const express = require('express');
const inquireController = require('../controllers/inquires');
const router = express.Router();

router.post('/', inquireController.sendInquire);

module.exports = router;