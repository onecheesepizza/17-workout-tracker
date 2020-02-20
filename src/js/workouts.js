import devTag from './app.js';
$(document).ready(function() {
//query API
$.getJSON( "/api/workouts", function( workouts ) {
    const length = workouts.length;
    //build HTML template
    let listHTML="";
    for (let i=0;i<length;i++){
        //build date string from workout timestamp
        const timeStamp = Date.parse(workouts[i].timestamp) ;
        var workoutDate = new Date(timeStamp);
        //pluralize 'minute' only if workoutLength is not 1
        let workoutLengthStr = ``;
        if (workouts[i].workoutLength == 1) {
            workoutLengthStr = `${workouts[i].workoutLength} Minute`
        } else {
            workoutLengthStr = `${workouts[i].workoutLength} Minutes`
        }
        listHTML+= `
        <a href="/workout?id=${workouts[i]["_id"]}">
        <link rel="prefetch" href="/workouts/${workouts[i]["_id"]}">
        <link rel="prefetch" href="/api/workouts/${workouts[i]["_id"]}">
        <li id="workout-${i}" class="workout">
            <div class="row">
                <div id="${workouts["_id"]}" class="col-12">
                <span class="float-left">${workoutDate.toLocaleDateString("en-US")}</span>
                <span class="center">${workouts[i].workoutType}</span>
                <span class="float-right">${workoutLengthStr}</span>
                </div>
            </div>
        </li>
        </a>
        `;
    };
    //add HTML to page
    $("#workouts").html(listHTML);
    //reveal page HTML (happening now to avoid flash of unstyled content)
    $("body").css({"opacity": "1"});
    //dev tag    
    devTag();
  });
});
