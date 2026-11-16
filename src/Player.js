export class Player{
    constructor(posX, posY, dirX, dirY, planeX, planeY){
        this.pos = { x:posX, y:posY};
        this.dir = { x:dirX, y:dirY};
        this.plane = { x:planeX, y:planeY};
    }

    moveForward(amount, map){
        const radius = 0.15;

        const stepX = this.dir.x * amount;
        const stepY = this.dir.y * amount;

        if(!map.isWall(this.pos.x + stepX + Math.sign(stepX)*radius, this.pos.y)){
            this.pos.x += stepX;
        }

        if(!map.isWall(this.pos.x, this.pos.y + stepY + Math.sign(stepY)*radius)){
            this.pos.y += stepY;
        }
    }
    strafe(amount, map){
        const radius = 0.15;

        const stepX = -this.dir.y * amount;
        const stepY = this.dir.x * amount;

        if(!map.isWall(this.pos.x + stepX + Math.sign(stepX)*radius, this.pos.y)){
            this.pos.x += stepX;
        }

        if(!map.isWall(this.pos.x, this.pos.y + stepY + Math.sign(stepY)*radius)){
            this.pos.y += stepY;
        }

    }
    rotate(angle){
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const oldDirX = this.dir.x;
        this.dir.x = this.dir.x * cos - this.dir.y * sin;
        this.dir.y = oldDirX * sin + this.dir.y * cos;

        const oldPlaneX = this.plane.x;
        this.plane.x = this.plane.x * cos - this.plane.y * sin;
        this.plane.y = oldPlaneX * sin + this.plane.y * cos;
    }
}