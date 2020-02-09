var express = require('express');
var router  = express.Router();

var workouts_controller = require('../controllers/workoutsController');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.post('/', workouts_controller.createWorkout);
router.get('/', isAuthenticated, workouts_controller.workouts);
router.get('/:id', isAuthenticated, workouts_controller.workout);
router.delete('/:id', workouts_controller.deleteWorkout);

module.exports = router;