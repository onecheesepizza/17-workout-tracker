// '/' 
exports.index = function(req, res) {
    res.render('home');
};
exports.home = function(req, res) {
    res.render('home');
};
// /login
exports.signin = function(req, res) {
    res.render('signin');
};
// /signup
exports.signup = function(req, res) {
    res.render('signup');
};
// /workouts
exports.workouts = function(req, res) {
    res.render('workouts');
};
// /workouts/:id
exports.workout = function(req, res) {
    //if /workout/new, render workout creation page
    if (req.params.id === "new") {
        res.render("workoutCreate");
    //else render the single party view
    } else {
        res.render("workout");
    }
};
// /404
exports.error404 = function(req, res) {
    res.render('error404');
};
// /offline
exports.offline = function(req, res) {
    res.render('offline');
};