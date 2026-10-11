console.log("killing myself very very soon");

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

const WIDTH = 320;
const HEIGHT = 200;
const SCALE = 3;

canvas.width  = WIDTH;
canvas.height = HEIGHT;

canvas.style.width = WIDTH*SCALE + "px";
canvas.style.height= HEIGHT*SCALE + "px";

context.imageSmoothingEnabled = false;
canvas.style.imageRendering = "pixelated"

const image = context.createImageData(WIDTH, HEIGHT);
const data = image.data;

for(let y = 0; y < HEIGHT; y++){
    for(let x = 0; x < WIDTH; x++){
        const offset = (y * WIDTH + x) * 4;
        data[offset]     = 255;
        data[offset + 1] = 0;
        data[offset + 2] = 0;
        data[offset + 3] = 255;
    }
}

const px = 10, py = 10;
const o = (py * WIDTH + px) * 4;
data[o + 0] = 255;
data[o + 1] = 255;
data[o + 2] = 255;
data[o + 3] = 255;

context.putImageData(image, 0, 0);