const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d');
const fond = document.getElementById("fond");
const car = document.getElementById("car");
const moteur = new Audio('moteur.mp3')
const klaxon = new Audio('klaxon.mp3')

const cloud = new Image();
cloud.src = 'cloud.png';

const crack = new Image();
crack.src = 'crack.png';

window.addEventListener("DOMContentLoaded", (event) => {
    moteur.play();
});

let startX = 200;
let startY = 100;

let time = 0;
let speed = 2;
let input = 0;

let isKlaxon = false

function animation() {
    requestAnimationFrame(animation);
    time += speed

    ctx.fillStyle = 'grey'
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill()

    const horizon = 300

    ctx.beginPath();
    ctx.rect(0, horizon, canvas.width, canvas.height);
    // ctx.strokeStyle = '#FFFFFF';
    ctx.drawImage(fond, 0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'black'
    ctx.fill()


    ctx.beginPath();
    ctx.moveTo((time / 5 - 3) % canvas.width - 3, 40);
    ctx.lineTo(time / 5 % canvas.width, 40);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((time / 3 - 1) % canvas.width / 2 - 1, 60);
    ctx.lineTo(time / 3 % canvas.width / 2, 60);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.drawImage(cloud, (0 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 150, 100);
    ctx.drawImage(cloud, (250 + time) % canvas.width - 300, Math.sin(time /
        100) * 10 + 100, 150, 160);
    ctx.drawImage(cloud, (470 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 250, 150);
    ctx.drawImage(cloud, (750 + time) % canvas.width - 300, Math.sin(time / 100) * 10 + 100, 160, 150);
    ctx.drawImage(cloud, (1000 + time) % canvas.width - 300, Math.sin(time /
        100) * 10 + 100, 300, 130);
    ctx.fill()

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

        if (h > canvas.height) {
            h = canvas.height;
        }

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, g);
        ctx.lineTo(canvas.width / 2, h);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    o = time / 5 % 85.5

    ctx.drawImage(crack, canvas.width / 2 + o, horizon + ((time / 85 * distance) % (canvas.height - horizon)), 60, 28)

    let value = navigator.getGamepads()[0].axes[2];

    ctx.beginPath();
    input = lerp(input, value, 0.1);
    ctx.drawImage(car, canvas.width / 2 + input * 190 - 75, Math.sin(time / 20) * 2 + 600, 150, 90);
    ctx.fill();

    if (navigator.getGamepads()[0].buttons[0].value == 1) {
        if (isKlaxon = true) {
            klaxon.play()
            klaxon.loop = false
        }
        isKlaxon = true
    }
    //console.log(navigator.getGamepads()[0].buttons[0].pressed)
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 37) {
        console.log("gauche")
    } else if (e.keyCode === 39) {
        console.log("droite")
    }
});

window.addEventListener("gamepadconnected", (event) => {
    console.log("A gamepad connected:");
    animation();
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    console.log(event.gamepad);
});

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}