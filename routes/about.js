const path = require('path');

const express = require('express');

const router = express.Router();

const aboutController = require('../controllers/about-controller');

router.get('/', aboutController.aboutPage);

module.exports = router;