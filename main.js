//variable declaration
var score = 0;
var timer = 0;

function gameStart(){
  document.getElementById("overlay").style.display="none";
  document.getElementById("overlayer").style.display="none";
  document.getElementById("logo").style.display="none";
  star_a.exclude();
  star_b.exclude();
  star_c.exclude();
  trash_a.spawn();
  trash_b.spawn();
  trash_c.spawn();
  trash_d.spawn();
  trash_e.spawn();
  trash_f.spawn();
  document.getElementById("start").play();
  timer = 60;
  count = setInterval(clock, 1000);
}

function gameEnd(){
  clearInterval(count);
  document.getElementById("title").innerHTML="Game Over";
  document.getElementById("control").innerHTML="Restart";
  var x = document.getElementsByClassName("star");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display="inline";
  }
  if (score >= 70){ 
    document.getElementById("grade").innerHTML="Excellent";
    star_a.include();
    star_b.include();
    star_c.include();
  }else if(score >= 50){
    document.getElementById("grade").innerHTML="Amazing";
    star_a.include();
    star_b.include();
    star_c.exclude();
  }else if(score >= 30){
    document.getElementById("grade").innerHTML="Fair";
    star_a.include();
    star_b.exclude();
    star_c.exclude();
  }else{
    document.getElementById("grade").innerHTML="Poor";
    star_a.exclude();
    star_b.exclude();
    star_c.exclude();
  }
  document.getElementById("result").innerHTML="You have found "+score+" piles of trash!";
  document.getElementById("score").innerHTML="0";
  document.getElementById("timer").innerHTML="1:00";
  score = 0;
  document.getElementById("overlayer").style.display="block";
  document.getElementById("overlay").style.display="block";
  document.getElementById("finish").play();
}

function clock(){
  timer = timer-1;
  var time = timer.toString();
  if (timer < 10){
    time = "0"+timer.toString();
  }
  document.getElementById("timer").innerHTML="0:"+time;
  if (timer <= 0){
    gameEnd();
  }
}

//Move the torch with cursor
(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;
        event = event || window.event;
        console.log("x: "+event.pageX+" y: "+event.pageY);
        var torchX = event.pageX-50;
        var torchY = event.pageY-50;
        var coverX = event.pageX-550;
        var coverY = event.pageY-550;
        if(torchX > window.innerWidth){
          torchY = window.innerWidth;
        }
        if (torchY > window.innerHeight){
          torchX = window.innerHeight;
        }
        trash_a.track(torchX, torchY);
        trash_b.track(torchX, torchY);
        trash_c.track(torchX, torchY);
        trash_d.track(torchX, torchY);
        trash_e.track(torchX, torchY);
        trash_f.track(torchX, torchY);
        document.getElementById("light").style.display="block";
        document.getElementById("cover").style.display="block";
        document.getElementById("light").style.left=torchX+"px";
        document.getElementById("light").style.top=torchY+"px";
        document.getElementById("cover").style.left=coverX+"px";
        document.getElementById("cover").style.top=coverY+"px";
    }
})();

//Check collection
(function() {
    document.onclick = handleOnclick;
    function handleOnclick(event) {
        var eventDoc, doc, body;
        event = event || window.event;
        trash_a.found(event.pageX, event.pageY);
        trash_b.found(event.pageX, event.pageY);
        trash_c.found(event.pageX, event.pageY);
        trash_d.found(event.pageX, event.pageY);
        trash_e.found(event.pageX, event.pageY);
        trash_f.found(event.pageX, event.pageY);
    }
})();

//Defining objects
function trash(id) {
  const obj = {};
  obj.id = id;
  obj.spawn = function() {
    obj.newX = Math.round(Math.random()*(window.innerWidth-300))+150;
    obj.newY = Math.round(Math.random()*(window.innerHeight-300))+150;
    document.getElementById(obj.id).style.left=obj.newX+"px";
    document.getElementById(obj.id).style.top=obj.newY+"px";
  };
  obj.track = function(cursorX, cursorY) {
    if (((obj.newY + 200 > cursorY && cursorY > obj.newY) || (obj.newY - 100 < cursorY && cursorY < obj.newY)) && ((obj.newX + 200 > cursorX && cursorX > obj.newX) || (obj.newX - 100 < cursorX && cursorX < obj.newX))){
      document.getElementById(obj.id).style.display="block";
    }else{
      document.getElementById(obj.id).style.display="none";
    }
  };
  obj.found = function(cursorX, cursorY) {
    if ((cursorX > obj.newX && cursorX < obj.newX+150) && (cursorY > obj.newY && cursorY < obj.newY+150) && timer > 0){
      document.getElementById(obj.id).style.display="none";
      document.getElementById("effect-"+obj.id.replace("trash-","")).play();
      score = score+1;
      document.getElementById("score").innerHTML=score.toString();
      obj.spawn();
    }
  }
  return obj;
}

function star(id) {
  const obj = {};
  obj.id = id;
  obj.include = function(){
    document.getElementById(obj.id).src="media/star.png";
  }
  obj.exclude = function(){
    document.getElementById(obj.id).src="media/empty.png";
  }
  return obj;
}

//Creating objects
const star_a = star('star-a');
const star_b = star('star-b');
const star_c = star('star-c');

const trash_a = trash('trash-a');
const trash_b = trash('trash-b');
const trash_c = trash('trash-c');
const trash_d = trash('trash-d');
const trash_e = trash('trash-e');
const trash_f = trash('trash-f');
