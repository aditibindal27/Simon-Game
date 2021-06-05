// At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];
// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

$(document).keydown(function() {
  if(started==false){
  $("#level-title").text("Level " + level); //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
  nextSequence(); //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
  started=true;
}

});

//  Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  //  Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userchosenColour = $(this).attr("id");
  //  Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userchosenColour);
  // console.log(userClickedPattern);
  playSound(userchosenColour);
  animatePress(userchosenColour);
  checkAnswer(userClickedPattern.length-1) //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function nextSequence() {
//  Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Use jQuery to select the button with the same id as the randomChosenColour and animate the chosen button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // set a variable to count how many colors the user got right
       var count = 0;
   // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
      for (var i = 0; i < gamePattern.length; i++) {
     if(gamePattern[i] === userClickedPattern[i]){
       // if the two values matche, count + 1
       count++;
     }
   }
   // ONLY if the count is the same number as gamePattern length,
   // (meaning each one of the colors was right) then it's success
   if(count === gamePattern.length){
     // console.log("success");
     setTimeout(function(){
         nextSequence();
       }, 1000);
      }

      }else {
      //  In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
                playSound("wrong");
        // console.log("wrong");

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Keyboard Key to Restart");
        startOver();
      }
}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");
  //remove the pressed classe after 100ms
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

  // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
