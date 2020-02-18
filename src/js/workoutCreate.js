$(document).ready(function() {
  $("#addWorkout").click(function(event) {
    event.preventDefault();
    //build newWorkout object with form values
    const newWorkout = {
      workoutType: $("#workoutType").val(),
      workoutLength: $("#workoutLength").val()
    };
    //post newWorkout to API
    $.post( "/api/workouts", newWorkout, function( response ) {
      //redirect to /workouts
      window.location.replace("/workouts");
    });
  });
  //reveal page HTML (happening now to avoid flash of unstyled content)
  $("body").css({"opacity": "1"});
});

