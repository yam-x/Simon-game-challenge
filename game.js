var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if(start===false)
    {
        nextSequence();
        start=true;
    }
    $("#level-title").text("Level 0" );
  });


  function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
       console.log("true");
   
    if (userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function(){nextSequence();},1000);
    }
    }
    else 
    {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
    

        setTimeout(function(){$("body").removeClass("game-over")
        },200);
        startOver();
    }
    
}
function startOver(){
    level=0;
    gamePattern=[];
    start=false;
    $("#level-title").html("Press A Key to Start again ");
}

function nextSequence(){
    userClickedPattern = [];
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var ids="#"+randomChosenColour;
    
    $(ids).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++;
    $("#level-title").html("Level "+level);
}


function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    

    setTimeout(function(){$("#"+currentColour).removeClass("pressed")

    },100);

}
