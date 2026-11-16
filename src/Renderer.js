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

    fillRect(x, y, w, h, r, g, b) {
        let x0 = Math.floor(x);
        let y0 = Math.floor(y);
        let x1 = Math.floor(x + w);
        let y1 = Math.floor(y + h);

        if(x0 < 0) x0 = 0;
        if(y0 < 0) y0 = 0;
        if(x1 > this.width) x1 = this.width;
        if(y1 > this.height)y1 = this.height;

        for (let py = y0; py < y1; py++){
            for(let px = x0; px < x1; px++){
                const offset = (py * this.width + px) * 4;
                this.data[offset]     = r;
                this.data[offset + 1] = g;
                this.data[offset + 2] = b;
                this.data[offset + 3] = 255;
            }
        }
    }
}