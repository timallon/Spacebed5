const canvas = document.querySelector("canvas");
canvas.style.border = "5px solid black";
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let bedX = canvasWidth * (0.5 - 0.05);
const bedY = canvasHeight * 0.85
let moveRight;
let moveLeft;
let gameId = 0;
const background = new Image();
background.src = "images/background.png";
const bed = new Image();
bed.src = "images/bed.png";
const dylanSmile = new Image();
dylanSmile.src = "images/dylan1.png";
const meteor1 = new Image();
meteor1.src = "images/meteorGrey_big1.png";
const alien = new Image();
alien.src = "images/alien.png";

const meteor1Arr = [
    { x: Math.floor(Math.random() * 620) + 50, y: -120, img: meteor1 },
    { x: Math.floor(Math.random() * 620) + 50, y: -470, img: meteor1 },
    { x: Math.floor(Math.random() * 620) + 50, y: -820, img: alien },
    { x: Math.floor(Math.random() * 620) + 50, y: -1170, img: meteor1 },
    
    
]

//add song
//const song = new Audio("audio/deedee.mp3");
//song.volume = 0.5;

//variables


window.onload = () => {
//    ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
//    document.getElementById('start-button').onclick = () => {
      startGame();
//    }

    function startGame() {
        startScreen.style.display = "none";
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(bed, bedX, bedY, canvasWidth * 0.1, canvasHeight * 0.1);
        ctx.drawImage(dylanSmile, bedX + (bed.width/27), bedY, bed.width * 0.055, bed.height * 0.07)
//        ctx.drawImage(meteor1, 275, 275, 75, 75);
        gameId = requestAnimationFrame(startGame);
        if (moveRight === true && bedX < canvasWidth * 0.9) {
            bedX += canvasWidth * 0.01;
          } else if (moveLeft === true && bedX > 0) {
            bedX -= canvasWidth * 0.01;
          }
        
              //traffic Cars
    //ctx.drawImage(trafficCar1, 275, trafficCar1_Y, 100, 150);
    //move the traffic car
    //trafficCar1_Y += 3;
    
        for (let i = 0; i < meteor1Arr.length; i += 1) {
            let current = meteor1Arr[i];
            ctx.drawImage(current.img, current.x, current.y, 100, 100);
            current.y += 3;
            if (current.y > canvas.height) {
            current.y = -300;
            }
        }

//    song.play(); 
    }
    // 
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
    
      
}