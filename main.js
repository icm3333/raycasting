import { Renderer } from "./src/Renderer.js";
import { Input} from "./src/Input.js";
import { Player} from "./src/Player.js";
import { GameMap} from "./src/GameMap.js";

const WIDTH  = 320;
const HEIGHT = 200;
const SCALE  = 3;

const canvas = document.getElementById("screen");
const renderer = new Renderer(canvas, WIDTH, HEIGHT, SCALE);
const input = new Input();
const player = new Player(4, 4, 0, -1, 0.66, 0);
const gameMap = new GameMap();
const TILE = 8;
const rotSpeed = 2;

let movespeed = 1;

let previousNow = null;

function drawLine(renderer, x0, y0, x1, y1, r, g, b){
    const steps = Math.ceil(Math.hypot(x1-x0, y1-y0));
    for(let i=0; i<=steps; i++){
        const t = i / steps;
        const x = x0 + (x1 - x0) * t;
        const y = y0 + (y1 - y0) * t;
        renderer.setPixel(Math.floor(x), Math.floor(y), r, g, b);
    }
}

function drawMinimap(renderer, map, player, tile){
    for(let cy = 0; cy < map.mapHeight; cy++){
        for(let cx = 0; cx < map.mapWidth; cx++){
            if(map.isWall(cx, cy)){
                renderer.fillRect(cx*tile, cy*tile, tile, tile, 180, 180, 180);
            }else{
                renderer.fillRect(cx*tile, cy*tile, tile, tile, 40, 40, 40);
            }
        }
    }

    const px = player.pos.x * tile;
    const py = player.pos.y * tile;
    renderer.fillRect(px-1, py-1, 3, 3, 255, 0 ,0);

    const lineLen = tile * 1.5;
    const ex = px + player.dir.x * lineLen;
    const ey = py + player.dir.y * lineLen;
    drawLine(renderer, px, py, ex, ey, 0, 255, 0);
}

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
    if (input.isDown("ArrowLeft"))  player.rotate(-rotSpeed * dt)
    if (input.isDown("ArrowRight")) player.rotate(rotSpeed * dt);

    renderer.clear(120, 0, 240);
    drawMinimap(renderer, gameMap, player, TILE);
    renderer.present();

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);