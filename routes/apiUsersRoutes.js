var express = require('express');
var router  = express.Router();

var passport = require("../config/passport");
var users_controller = require('../controllers/usersController');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/signout', users_controller.signoutUser);
router.get('/authCheck', users_controller.authCheck);

router.post('/signin', passport.authenticate("local"), users_controller.signinUser);
router.post('/', users_controller.signupUser);

module.exports = router;