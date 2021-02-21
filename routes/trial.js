const path = require('path');

const express = require('express');

const router = express.Router();

const trialController = require('../controllers/trial-controller');

router.get('/', trialController.getTrialPage);

router.post('/', trialController.postTrialPage);

module.exports = router;