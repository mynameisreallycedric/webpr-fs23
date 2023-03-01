
const radius = 10;
const ball = {x:20, y:0, dx: 5, dy: 1};
let   old  = {x: ball.x, y: ball.y};

let speedX = 2;
let speedY = 5;

let gravity = 5;

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "#131313";

    maxX = canvas.width;
    maxY = canvas.height;

    ball.dy = -20;

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 20);
}

function nextBoard() {
    old.x = ball.x;
    old.y = ball.y;

    // handle ball hitting the bounds
    if (ball.x + radius > maxX || ball.x - radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + radius > maxY || ball.y - radius < 0) {
        ball.dy = -ball.dy * 0.8; // lose some energy due to collision
        ball.dx = ball.dx * 0.9; // lose some energy due to medium resistance
        ball.y = maxY - radius; // adjust ball position to avoid getting stuck at bottom
    }

    // calculate new position
    ball.x += ball.dx * speedX;
    ball.y += ball.dy * speedY;

    // calculate any changes in velocity due to gravitational pull
    ball.dy += gravity;

    // reset acceleration due to gravity if ball is at the bottom
    if (ball.y + radius >= maxY) {
        ball.dy = -ball.dy * 0.8; // lose some energy due to collision
        ball.dx = ball.dx * 0.9; // lose some energy due to medium resistance
        ball.y = maxY - radius; // adjust ball position to avoid getting stuck at bottom
    }
}


function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}


