const express = require('express');
const interestController = require('../controllers/interests');
const router = express.Router();

router.post('/', interestController.createInterest);
router.delete('/', interestController.deleteInterest);
router.get('/', interestController.readInterestList);
router.get('/:id', interestController.getInterestState);

module.exports = router;