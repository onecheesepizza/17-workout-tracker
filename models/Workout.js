'use strict';

// app/models/Workout.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var workoutSchema = mongoose.Schema({
    userId: {
        type: String,
        min: [1, 'Too few characters'],
        required: [true, 'Data required']
      },
    timestamp: {
        type: Date,
        default: Date.now,
        required: [true, 'Data required']
      },
    workoutType: {
        type: String,
        min: [1, 'Too few characters'],
        required: [true, 'Please enter workout type']
    },
    workoutLength: {
        type: Number,
        required: true
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Workout', workoutSchema);