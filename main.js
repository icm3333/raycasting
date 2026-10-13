import { Renderer } from "./src/Renderer.js";
import { Input} from "./src/Input.js";
import { Player} from "./src/Player.js";

const WIDTH  = 320;
const HEIGHT = 200;
const SCALE  = 3;

const canvas = document.getElementById("screen");
const renderer = new Renderer(canvas, WIDTH, HEIGHT, SCALE);
const input = new Input();
const player = new Player(4, 4, 0, -1, 0.66, 0);

let movespeed = 1;

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

    if (input.isDown("KeyW")) player.moveForward(movespeed*dt);
    if (input.isDown("KeyS")) player.moveForward(-movespeed*dt);
    if (input.isDown("KeyD")) player.strafe(movespeed * dt);
    if (input.isDown("KeyA")) player.strafe(-movespeed * dt);

    renderer.clear(120, 0, 240);
    renderer.present();

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);