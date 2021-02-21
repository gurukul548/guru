const path = require('path');

const express = require('express');

const router = express.Router();

const courseController = require('../controllers/course-controller');

const isAuth = require('../middleware/is-auth');

router.get('/', courseController.getCoursePage);

router.get('/enroll', isAuth, courseController.getEnrollPage);

router.post('/enroll', isAuth, courseController.postEnrollPage);

module.exports = router;