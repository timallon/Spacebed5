const canvas = document.querySelector("canvas");
const gameOver = document.querySelector(".game-over");
const muteButton = document.querySelector("#mute-button");
const scoreElement = document.querySelector("#score");
canvas.style.border = "5px solid black";
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let bedX = canvasWidth * (0.5 - 0.05);
const bedY = canvasHeight * 0.85
let isGameOver = false;
let gameId = 0;
let moveRight = false;
let moveLeft = false;
const background = new Image();
background.src = "./images/background.png";
const bed = new Image();
bed.src = "./images/bed.png";
const dylanSmile = new Image();
dylanSmile.src = "./images/dylan1.png";
const meteor1 = new Image();
meteor1.src = "./images/meteorGrey_big1.png";
const alien = new Image();
alien.src = "./images/alien.png";
const bedWidth = bed.width;
const bedHeight = bed.height * 0.07;
let score = 0;
let point = 0;
let speedRatio = 0
// delay function:
let delayInMilliseconds = 100; //0.1 second



function muteAll() {song.pause(); crashNoise.pause(); pointNoise.pause()}

let meteor1Arr = [
    { x: Math.floor(Math.random() * 660) + 1, y: -120 , img: meteor1 },
    { x: Math.floor(Math.random() * 660) + 1, y: -470, img: meteor1 },
    { x: Math.floor(Math.random() * 660) + 1, y: -820, img: meteor1 },
    { x: Math.floor(Math.random() * 660) + 1, y: -1170, img: meteor1 },
]

//add audio
const song = new Audio("./audio/deedee.mp3");
song.volume = 0.5;
song.preservesPitch = false
const pointNoise = new Audio("./audio/3rd-blip-95666.mp3");
pointNoise.volume = 0.07;
const crashNoise = new Audio ("./audio/hq-explosion-6288.mp3")
crashNoise.volume = 0.1;

function random() {
    return Math.floor(Math.random() * 660) + 20
}

window.onload = () => {
    ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
    gameOver.style.display = "none";
    canvas.style.display = "none";

    document.getElementById('start-button').onclick = () => {
      startScreen.style.display = "none";
      canvas.style.display = "block";
      startGame();
      song.play(); 

    }



    document.getElementById("restart-button").onclick = () => {
      gameOver.style.display = "none";
      canvas.style.display = "block";
      isGameOver = false;
      score = 0;
      meteor1Arr = [
        { x: Math.floor(Math.random() * 660) + 1, y: -120 , img: meteor1 },
        { x: Math.floor(Math.random() * 660) + 1, y: -470, img: meteor1 },
        { x: Math.floor(Math.random() * 660) + 1, y: -820, img: meteor1 },
        { x: Math.floor(Math.random() * 660) + 1, y: -1170, img: meteor1 },
    ]
      startGame();
      song.play();
    }

    function startGame() {

      startScreen.style.display = "none";
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(bed, bedX, bedY, canvasWidth * 0.1, canvasHeight * 0.1);
      ctx.clearRect(bedX +  (bed.width/18), bedY, bed.width * 0.055 * 1, bedHeight * 1)
      ctx.drawImage(dylanSmile, bedX +  (bed.width/18), bedY, bed.width * 0.055, bedHeight)
      
      
      gameId = requestAnimationFrame(startGame);
      if (isGameOver === true) {
          cancelAnimationFrame(gameId);
          gameOver.style.display = "block";
          canvas.style.display = "none";
      }
      //console.log(gameId)
      if (moveRight === true && bedX < canvasWidth * 0.9) {
          bedX += canvasWidth * 0.01 * (1 + score/2000);
        } else if (moveLeft === true && bedX > 0) {
          bedX -= canvasWidth * 0.01 * (1 + score/2000);
        }
      

      for (let i = 0; i < meteor1Arr.length; i += 1) {
          let current = meteor1Arr[i];
          ctx.font = '48px ArcadeClassic';
          ctx.fillStyle = 'white';
          ctx.fillText(`Score: ${score}`, 50, 50);
          ctx.drawImage(current.img, current.x, current.y, 100, 100);
          current.y += 5 + score/100;
          if (current.y > canvas.height) {
          current.y = -300; current.x = random(); score += 10; pointNoise.play();
          
          console.log(score)
          song.playbackRate= 1 + score/10000
          }
      
          if (
      current.y + 83 > bedY &&
              current.x + 80 > bedX &&
              current.x - 67 < bedX &&
              current.y - 80 < bedY

            ) {
              isGameOver = true;
              crashNoise.play();
              song.pause();
              song.currentTime = 0;
              scoreElement.innerText = score;
              //song.preservesPitch = true;
              song.playbackRate= 1;

            
            } 
      }

    
    }
    document.addEventListener("keydown", (event) => {
        if (event.code === "ArrowRight") {
        console.log("right arrow pressed");
        moveRight = true;
        } else if (event.code === "ArrowLeft") {
        console.log("left arrow pressed");
        moveLeft = true;
        }
    });

    document.addEventListener("keyup", () => {
        moveRight = false;
        moveLeft = false;
      });

    muteButton.addEventListener("click", () => {
      console.log(muteButton.innerText)
      if (muteButton.innerText === "Mute Music") {
        muteButton.innerText = "Unmute Music";
        muteAll();
      } else  {
        muteButton.innerText = "Mute Music";
      song.play()
      }
      
    } ) 
}
/*
function gameOver () {
  song.pause();
  explosion.play();
  gameOver.style.display = "flex";
}
*/


