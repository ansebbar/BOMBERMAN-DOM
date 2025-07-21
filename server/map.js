const MAP_WIDTH = 26;
const MAP_HEIGHT = 26;
const WALL = 'WALL';
const BLOCK = 'BLOCK';
const EMPTY = 'EMPTY';
const POWERUP = 'POWERUP';

//players positions
const PLAYER_STARTS = [
    { x: 0, y: 0 },
    { x: MAP_WIDTH - 1, y: 0 },
    { x: 0, y: MAP_HEIGHT - 1 },
    { x: MAP_WIDTH - 1, y: MAP_HEIGHT - 1 }
];

class Map {
    constructor() {
        this.grid = this.generateMap();
    }

    generateMap() {
        const grid = Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill(EMPTY));
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                if ((x == 0 || y  == 0 || x == MAP_WIDTH-1 || y == MAP_HEIGHT -1)) {
                    grid[y][x] = WALL;
                }
            }
        }

        for (let y = 1; y < MAP_HEIGHT - 1; y++) {
            for (let x = 1; x < MAP_WIDTH - 1; x++) {
                if (grid[y][x] === EMPTY && !this.isStartZone(x, y)) {
                    if (Math.random() < 0.7) grid[y][x] = BLOCK; // 70% chance
                }
            }
        }
        return grid;
    }

    isStartZone(x, y) {
        return PLAYER_STARTS.some(pos => Math.abs(pos.x - x) <= 1 && Math.abs(pos.y - y) <= 1);
    }

    destroyBlock(x, y) {
        if (this.grid[y][x] === BLOCK) {
            this.grid[y][x] = EMPTY;
            if (Math.random() < 0.3) this.grid[y][x] = POWERUP; //30% chance for powerup
            return true;
        }
        return false;
    }

    getCell(x, y) {
        return this.grid[y][x];
    }

    setCell(x, y, value) {
        this.grid[y][x] = value;
    }
}


module.exports = Map