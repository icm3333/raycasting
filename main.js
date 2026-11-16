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

function castWalls(renderer, map, player){
    const W = renderer.width;
    const H = renderer.height;

    for(let x = 0; x<W; x++){
        const cameraX = 2 * x / W - 1;
        const rayDirX = player.dir.x + player.plane.x * cameraX;
        const rayDirY = player.dir.y + player.plane.y * cameraX;

        let mapX = Math.floor(player.pos.x);
        let mapY = Math.floor(player.pos.y);

        const deltaDistX = (rayDirX === 0) ? Infinity : Math.abs(1/rayDirX);
        const deltaDistY = (rayDirY === 0) ? Infinity : Math.abs(1/rayDirY);

        let stepX, stepY, sideDistX, sideDistY;

        if(rayDirX < 0){
            stepX = -1;
            sideDistX = (player.pos.x - mapX) * deltaDistX;
        }else{
            stepX = 1;
            sideDistX = (mapX + 1 - player.pos.x) * deltaDistX;
        }

        if(rayDirY < 0){
            stepY = -1;
            sideDistY = (player.pos.y - mapY) * deltaDistY;
        }else{
            stepY = 1;
            sideDistY = (mapY + 1 - player.pos.y) * deltaDistY;
        }

        let hit = 0;
        let side;
        while(hit === 0){
            if(sideDistX < sideDistY){
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            }else{
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            if(map.isWall(mapX, mapY)) hit = 1;
        }

        let perpDist;
        if(side === 0){
            perpDist = (sideDistX - deltaDistX);
        }else{
            perpDist = (sideDistY - deltaDistY);
        }

        let lineHeight = Math.floor(H / perpDist);
        let drawStart = Math.floor(-lineHeight / 2 + H / 2);
        let drawEnd = Math.floor(lineHeight / 2 + H / 2);
        if(drawStart < 0) drawStart = 0;
        if(drawEnd >= H) drawEnd = H - 1;

        let r = 200, g = 60, b = 60;
        if(side === 1){
            r = Math.floor(r*0.7);
            g = Math.floor(g*0.7);
            b = Math.floor(b*0.7);
        }
        for(let y = drawStart; y <= drawEnd; y++){
            renderer.setPixel(x, y, r, g, b);
        }
    }
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

    if (input.isDown("KeyW")) player.moveForward(movespeed*dt, gameMap);
    if (input.isDown("KeyS")) player.moveForward(-movespeed*dt, gameMap);
    if (input.isDown("KeyD")) player.strafe(movespeed * dt, gameMap);
    if (input.isDown("KeyA")) player.strafe(-movespeed * dt, gameMap);
    if (input.isDown("ArrowLeft"))  player.rotate(-rotSpeed * dt)
    if (input.isDown("ArrowRight")) player.rotate(rotSpeed * dt);

    renderer.clear(120, 0, 240);
    renderer.fillRect(0, 0, WIDTH, HEIGHT/2, 50, 50, 70);
    renderer.fillRect(0, HEIGHT/2, WIDTH, HEIGHT/2, 80, 80, 80);
    castWalls(renderer, gameMap, player);
    renderer.present();

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);