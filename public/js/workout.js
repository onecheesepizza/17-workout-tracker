//get workout ID from URL
const pathArray = window.location.pathname.split("/");
const workoutID = pathArray[pathArray.length - 1];
//build query URL from ID
const queryURL = "/api/workouts/" + workoutID;
//query API
$.getJSON(queryURL, function(workout) {
  //update page title
  $("#title-workout").html(workout.name);
  //parse workout timestamp
  const timeStamp = Date.parse(workout.timestamp);
  var workoutDate = new Date(timeStamp);
  //build HTML template, with create links for blank character slows
  let htmlTemplate = `
    <ul>
        <li>Date: ${workoutDate.toLocaleDateString("en-US")}</li>
        <li>Type: ${workout.workoutType}</li>
        <li>Duration: ${workout.workoutLength} Minutes</li>
    </ul>
    `;
  //add HTML to page
  $("#workout-info").html(htmlTemplate);
  //add event listener to delete button
  $("#deleteWorkout").click(function(event) {
    //delete workout API call
    $.ajax({
      url: "/api/workouts/" + workoutID,
      type: "DELETE",
      //redirect to /workouts on success
      success: function(result) {
        window.location.replace("/workouts");
      }
    });
  });
});
