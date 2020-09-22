const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d');
const fond = document.getElementById("fond");
const car = document.getElementById("car");
const moteur = new Audio('moteur.mp3')
const klaxon = new Audio('klaxon.mp3')

const cloud = new Image();
cloud.src = 'https://upload.wikimedia.org/wikipedia/commons/7/73/W_cloud.svg';

window.onload = function() {
    moteur.play();
};


let startX = 200;
let startY = 100;

let time = 0;
let speed = 2;

function animation() {
    requestAnimationFrame(animation);
    time += speed

    ctx.fillStyle = 'black'
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill()

    const horizon = 300

    ctx.beginPath();
    ctx.rect(0, horizon, canvas.width, canvas.height);
    // ctx.strokeStyle = '#FFFFFF';
    ctx.drawImage(fond, 0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'black'
    ctx.fill()

    // for (let c = 1; c < 10; c++) {
    //     ctx.beginPath();
    //     ctx.drawImage(cloud, canvas.width / (Math.random() * c), horizon * (Math.random() * c), 300, 250);
    //     ctx.fill()
    // }

    // cloud 

    // ctx.beginPath();
    // ctx.moveTo(0, horizon);
    // ctx.bezierCurveTo(0, 0, startX - 40, startY + 70, startX + 60, startY + 70);
    // ctx.bezierCurveTo(startX + 80, startY + 100, startX + 150, startY + 100, startX + 170, startY + 70);
    // ctx.bezierCurveTo(startX + 250, startY + 70, startX + 250, startY + 40, startX + 220, startY + 20);
    // ctx.bezierCurveTo(startX + 260, startY - 40, startX + 200, startY - 50, startX + 170, startY - 30);
    // ctx.bezierCurveTo(startX + 150, startY - 75, startX + 80, startY - 60, startX + 80, startY - 30);
    // ctx.bezierCurveTo(startX + 30, startY - 75, startX - 20, startY - 60, startX, startY);
    // ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(canvas.width, horizon);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + 50, horizon);
    ctx.lineTo(canvas.width / 2 + 300, canvas.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 50, horizon);
    ctx.lineTo(canvas.width / 2 - 300, canvas.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    for (let i = 0; i < 5; i++) {
        length = 500;
        distance = 90;
        v = ((time + i * distance) % (canvas.height - horizon));

        g = horizon + v;
        h = g + length * g * g * 0.0000002;
        //Math.sqrt(length * i);

        if (h > canvas.height) {
            h = canvas.height;
        }
        // console.log(g);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, g);
        ctx.lineTo(canvas.width / 2, h);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    let value = navigator.getGamepads()[0].axes[2]

    // console.log(value)

    if (value > 0.1) {
        ctx.beginPath();
        ctx.drawImage(car, canvas.width / 2, 600, 150, 90);
        ctx.fill()
    }

    // if (value < -0.1) {
    //     console.log("test2");
    // }

    if (navigator.getGamepads()[0].buttons[0].value = 1) {
        klaxon.play()
    }
    //console.log(navigator.getGamepads()[0].buttons[0].pressed)
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("A gamepad connected:");
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    console.log(event.gamepad);
});

animation();