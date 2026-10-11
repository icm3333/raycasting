export class Renderer{
    constructor(canvas, width, height, scale){
        this.width = width;
        this.height= height;

        canvas.width = width;
        canvas.height= height;
        canvas.style.width  = width * scale + "px";
        canvas.style.height = height * scale + "px";

        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        canvas.style.imageRendering = "pixelated";

        this.image = this.context.createImageData(width, height);
        this.data = this.image.data;
    }

    clear(r, g, b){
        const {data, width, height} = this;

        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                const offset = (y * width + x)*4;
                data[offset]     = r;
                data[offset + 1] = g;
                data[offset + 2] = b;
                data[offset + 3] = 255;
            }
        }
    }

    setPixel(x, y, r, g, b){
        const offset = (y * this.width + x)*4;
        this.data[offset]     = r;
        this.data[offset + 1] = g;
        this.data[offset + 2] = b;
        this.data[offset + 3] = 255;
    }

    present(){
        this.context.putImageData(this.image, 0, 0)
    }
}