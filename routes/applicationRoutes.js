var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");

var application_controller = require('../controllers/applicationController');

router.get('/', isAuthenticated, application_controller.index);
router.get('/signin', application_controller.signin);
router.get('/signup', application_controller.signup);
router.get('/workouts', isAuthenticated, application_controller.workouts);
router.get('/workouts/:id', isAuthenticated, application_controller.workout);

module.exports = router;