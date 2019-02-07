
//GLOBAL VARIABLES

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern =  [];

var level = 0;

var started = false;



// FUNCTIONS
function nextSequence() {

  userClickedPattern = [];

  var randomNumber =  Math.floor(Math.random()*(4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour + " added to sequence");

  $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);


  $("#level-title").text("Level " + level);



}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour){
  var button = $("." + currentColour);
  button.addClass("pressed");

  setTimeout(function(){

    button.removeClass("pressed");}, 100);

}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel -1 ] === gamePattern[currentLevel - 1] ){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }

  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass();
    },200);

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();

    console.log("Fail");

  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];


}


// EVENT LISTENERS


$(".btn").click(function (){

  console.log("Button clicked!");

  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length)

  console.log(userChosenColour);

});

$(document).keypress(function() {

    if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
