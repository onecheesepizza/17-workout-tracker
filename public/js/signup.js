$("#signupButton").click(function(event) {
  event.preventDefault();
  //create new user object
  const newUser = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    username: $("#username").val(),
    email: $("#email").val(),
    password: $("#password").val()
  };
  //post newUser to API
  $.post( "/api/users", newUser, function( response ) {
    //redirect home
    window.location.replace("/");
  });
});

