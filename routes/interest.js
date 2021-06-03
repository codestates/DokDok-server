const express = require('express');
const interestController = require('../controllers/interests');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtToken');

router.post('/', jwtMiddleware, interestController.createInterest);
router.delete('/', jwtMiddleware, interestController.deleteInterest);
router.get('/', jwtMiddleware, interestController.readInterestList);
router.get('/:id', jwtMiddleware, interestController.getInterestState);

module.exports = router;
