const path = require('path');

const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contact-controller');

router.get('/', contactController.contactPage);

module.exports = router;