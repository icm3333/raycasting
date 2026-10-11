import { Renderer } from "./src/Renderer.js";

const WIDTH  = 320;
const HEIGHT = 200;
const SCALE  = 3;

const canvas = document.getElementById("screen");
const renderer = new Renderer(canvas, WIDTH, HEIGHT, SCALE);

renderer.clear(255, 0, 0);
renderer.setPixel(10, 10, 255, 255,255);
renderer.present();