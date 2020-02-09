module.exports = function(app){
	//html routes
	const application = require('./routes/applicationRoutes');
	//api routes
	const apiUsers = require('./routes/apiUsersRoutes');
	const apiWorkouts = require('./routes/apiWorkoutsRoutes');

	//html routes
	app.use('/', application);
	//api routes
	app.use('/api/users', apiUsers);
	app.use('/api/workouts', apiWorkouts);
}