export class GameMap{
    constructor(){
        this.grid = [[1, 1, 1, 1, 1, 1, 1],
                     [1, 0, 0, 0, 0, 0, 1],
                     [1, 0, 0, 0, 0, 0, 1],
                     [1, 0, 0, 0, 0, 0, 1],
                     [1, 1, 1, 1, 1, 1, 1]]

        this.mapHeight = this.grid.length;
        this.mapHeight = this.grid[0].length;
    }

    isWall(x, y){
        if(x < 0 || y < 0) return true;
        if(x >= this.mapWidth || y >= this.mapHeight) return true;
        return this.grid[y][x] !== 0;
    }
}