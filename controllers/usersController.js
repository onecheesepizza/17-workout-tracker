var User = require('../models/User');

// signup
exports.signupUser = function(req,res) {

  User.findOne({ 'username' :  req.body.username }, function(err, user) {

    // check to see if theres already a user with that email
    if (user) {
        res.send({
          duplicateUser: true
        })
    } else {

        // if there is no user with that email
        // create the user
        var newUser            = new User();

        // set the user's local credentials
        newUser.firstName    = req.body.firstName;
        newUser.lastName    = req.body.lastName;
        newUser.username    = req.body.username;
        newUser.email       = req.body.email;
        newUser.password    = newUser.generateHash(req.body.password);

        // save the user
        newUser.save()
          .then(function(newDBUser) {
          // res.send({redirect: '/'});
          res.json(newDBUser);
        }).catch(function(err) {
          res.json(err);
        });
    }

  }); 
};

// signin
exports.signinUser = function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
};

// signout
exports.signoutUser = function(req,res) {
  req.logout();
  res.redirect("/");
};

// authCheck
exports.authCheck = function(req, res) {
  if (req.isAuthenticated()) {
    console.log("logged in! user:", req.user.username);
    res.json(`logged in! user: ${req.user.username}`);
  } else {
    console.log("user not logged in");
    res.json("user not logged in");
  }
};

