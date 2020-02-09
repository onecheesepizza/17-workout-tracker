//require mongoose and Workout model
const mongoose = require("mongoose");
var Workout  = require('../models/Workout');

// api/workouts POST
exports.createWorkout = function(req, res) {
	//add id from req.user onto req.body
  req.body.userId = req.user.id;
  //create new Workout
  const newWorkout = new Workout(req.body);
  //save Workout to DB
  newWorkout.save().then(function(dbPost) {
    //if successful, respond with new Workout 
    res.json(dbPost);
  });
};

// /api/workouts/ GET
exports.workouts = function(req, res) {
  //find Workouts with specified userId
	Workout
  .find()
  .where('userId').equals(req.user.id)
  .sort( { timestamp: -1 } )
  .then(function(dbWorkouts) {
    //if successful, respond with array of Workouts 
    res.json(dbWorkouts);
  });
};

// /api/workouts/:id GET
exports.workout = function(req, res) {
  //find Workout with specified ID
  console.log(req.user.id);
	Workout.findOne(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
      userId: req.user.id
    },
    //respond with error if one exists
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    }
  );
};

// api/workouts/:id DELETE
exports.deleteWorkout = function(req, res) {
	//add id from req.user onto req.body
  req.body.userId = req.user.id;
  Workout
  .deleteOne({
    _id: mongoose.Types.ObjectId(req.params.id),
    userId: req.user.id
  })
  .then(function(deletedWorkout) {
    //if successful, respond with array of Workouts 
    res.json(deletedWorkout);
  });
};
