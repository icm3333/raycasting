export class Player{
    constructor(posX, posY, dirX, dirY, planeX, planeY){
        this.pos = { x:posX, y:posY};
        this.dir = { x:dirX, y:dirY};
        this.plane = { x:planeX, y:planeY};
    }

    moveForward(amount){
        this.pos.x += this.dir.x * amount;
        this.pos.y += this.dir.y * amount;
    }
    strafe(amount){
        this.pos.x += -this.dir.y * amount;
        this.pos.y +=  this.dir.x * amount;
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