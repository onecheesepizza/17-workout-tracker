module.exports = function(app){
	//api routes
	const apiUsers = require('./routes/apiUsersRoutes');
	const apiWorkouts = require('./routes/apiWorkoutsRoutes');

	//api routes
	app.use('/api/users', apiUsers);
	app.use('/api/workouts', apiWorkouts);
}