const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const box = 32;
//-------load images
const ground = new Image();
ground.src = "./image/ground.png";
const foodImg = new Image();
foodImg.src = "image/food.png";
//-------load audio
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();
const up = new Audio();
dead.src = "./audio/dead.mp3";
eat.src = "./audio/eat.mp3";
left.src = "./audio/left.mp3";
right.src = "./audio/right.mp3";
down.src = "./audio/down.mp3";
up.src = "./audio/up.mp3";

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
let score = 0;
let d;
//------------------addeventlistener
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (e.keyCode == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (e.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (e.keyCode == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
});
let arzesh;
function collision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      arzesh = true;
    }
  }
  if (arzesh == true) {
    return true;
  } else {
    return false;
  }
}
let food = {
  //number N az 1 ta 17
  x: Math.floor(Math.random() * 17 + 1) * box,
  //number N az 3 ta 15
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//------------------function
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  //-------food
  ctx.drawImage(foodImg, food.x, food.y);
  //----snake

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //add newHead to snake
  snake.unshift(newHead);
  //------score UP
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      //number N az 1 ta 17
      x: Math.floor(Math.random() * 17 + 1) * box,
      //number N az 3 ta 15
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  //------------game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  //---------draw score
  ctx.fillStyle = "white";
  ctx.font = "45px change one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
