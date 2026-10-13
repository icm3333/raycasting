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
}