const canvas = document.querySelector("canvas");
canvas.style.border = "5px solid black";
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let bedX = canvasWidth * (0.5 - 0.05);
const bedY = canvasHeight * 0.85


//add song
const song = new Audio("audio/deedee.mp3");
song.volume = 0.5;

//variables
const background = new Image();
background.src = "images/background.png";
const bed = new Image();
bed.src = "images/bed.png";

window.onload = () => {
    ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
    document.getElementById('start-button').onclick = () => {
      startGame();
    }

    function startGame() {
        startScreen.style.display = "none";
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(bed, bedX, bedY, canvasWidth * 0.1, canvasHeight * 0.1);
    song.play(); 
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