song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;


function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modeloaded);
  poseNet.on('pose', gotposes);
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("red");
  stroke("red");

  circle(rightWristX,rightWristY,20);

  if(rightWristY >0 && rigthWristY <= 100){
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
  }
  else if(rightWristY >100 && rightWristY <=200)
  {
    document.getElementById("speed").innerHTML = "1x";
    song.rate(1);
  }
  else if(rightWristY >200 && rightWristY <=300)
  {
    document.getElementById("speed").innerHTML = "1.5x";
    song.rate(1.5);
  }
  else if(rightWristY >300 && rightWristY <=400)
  {
    document.getElementById("speed").innerHTML = "2x";
    song.rate(2);
  }
  else if(rightWristY >400 && rightWristY <=500)
  {
    document.getElementById("speed").innerHTML = "2.5x";
    song.rate(2.5);
  }




  if (scoreLeftwrist > 0.2) {
    circle(leftWristX, leftWristY, 20);

    InNumberleftWristY = Number(leftWristY);
    removeDecimals = floor(InNumberleftWristY);
    volume = removeDecimals / 500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modeloaded() {
  console.log("postNet is initalized")
}

function gotposes(results) {
  if (results.length > 0) {
    scoreLeftwrist = results[0].pose.keypoints[9].score;
    console.log("score Left wrist=" + scoreLeftwrist);
    scoreRightwrist = results[0].pose.keypoints[9].score;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
  }
}