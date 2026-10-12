import { Renderer } from "./src/Renderer.js";
import { Input} from "./src/Input.js";

const WIDTH  = 320;
const HEIGHT = 200;
const SCALE  = 3;

const canvas = document.getElementById("screen");
const renderer = new Renderer(canvas, WIDTH, HEIGHT, SCALE);
const input = new Input();

let pixelX = 0;
let pixelY = 0;
let speed = 60;

let previousNow = null;

function frame(now){
    if(previousNow === null){
        previousNow = now;
        requestAnimationFrame(frame);
        return;
    }

    let dt = (now - previousNow) / 1000;
    dt = Math.min(dt, 0.1);
    previousNow = now;

    if (input.isDown("ArrowRight")) pixelX += speed * dt;
    if (input.isDown("ArrowLeft"))  pixelX -= speed * dt;

    if (input.isDown("ArrowUp")) pixelY -= speed * dt;
    if (input.isDown("ArrowDown"))  pixelY += speed * dt;

    if (pixelX < 0) pixelX += WIDTH;
    if (pixelY >= HEIGHT) pixelY -= HEIGHT;
    if (pixelY < 0) pixelY += HEIGHT;

    renderer.clear(120, 0, 240);
    renderer.setPixel(Math.floor(pixelX), Math.floor(pixelY), 255, 255, 255);
    renderer.present();

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);