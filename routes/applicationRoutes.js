var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");

var application_controller = require('../controllers/applicationController');

router.get('/', isAuthenticated, application_controller.index);
router.get('/home', application_controller.home);
router.get('/signin', application_controller.signin);
router.get('/signup', application_controller.signup);
router.get('/workout', application_controller.workout);
router.get('/workouts', application_controller.workouts);
router.get('/workouts/:id', isAuthenticated, application_controller.workout);

router.get('/error404', application_controller.error404);
router.get('/offline', application_controller.offline);

module.exports = router;