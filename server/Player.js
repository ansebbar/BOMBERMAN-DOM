const Bomb = require("./Bomb.js")
class Player {
  constructor(name, map) {
    this.name = name
    this.id = Math.floor(Date.now() * Math.random()).toFixed()
    this.position = { x: 1, y: 1 }
    this.stats = { speed: 5, range: 2, bCount: 1 }
    this.lives = 3
    this.map = map
  }
  layBomb() {

    return new Bomb(this.id , this.position , this.stats.range)
  }


 // Check and collect powerup at current position
  checkPowerUpCollection() {
    const powerUp = this.map.getPowerUpAt(this.position.x, this.position.y);
    if (powerUp) {
      powerUp.applyToPlayer(this);
      this.map.removePowerUp(this.position.x, this.position.y);
      return powerUp;
    }
    return null;
  }

  move(dir) {
      console.log("New ///////////////////////////////////////////////////////////////////////:");

    let oldx= this.position.x;
    let oldy= this.position.y;
    switch (dir) {
      case "Up":
        // console.log("fllll" , this.map.grid ,this.map.grid.flat() ,  this.map.grid.flat()[this.position.y-1] );

        // this.map.grid[this.position.y-1][this.position.x] == "EMPTY" && (this.position.y -= 1.5)
        console.log(this.map.grid.flat())
        console.log("POOOOS", this.map.grid[this.position.y - 1][this.position.x], this.position.y - 1, this.position.x);

        if ((this.position.y - 1 >= 1 && this.position.y <= this.map.grid.length - 1) &&
          this.map.grid[this.position.y - 1][this.position.x] == "BLOCK") this.position.y -= 1

        break
      case "Down":
        if ((this.position.y + 1 >= 1 && this.position.y <= this.map.grid.length - 1) &&
          this.map.grid[this.position.y + 1][this.position.x] == "BLOCK")
          this.position.y += 1
        break

      case "Left":
        console.log("immm here");
        if ((this.position.x - 1 >= 1 && this.position.x <= this.map.grid.length - 1) &&
          this.map.grid[this.position.y][this.position.x - 1] == "BLOCK")
          this.position.x -= 1
        break


      case "Right":
        if ((this.position.x + 1 >= 1 && this.position.x <= this.map.grid.length - 1) &&
          this.map.grid[this.position.y][this.position.x + 1] == "BLOCK")
          this.position.x += 1

        break;
    }
        // Check if the new position is walkable
    if (!(this.position.x== oldx && this.position.y == oldy)) {
      
      // Check for powerup collection after movement
      return this.checkPowerUpCollection();
    }
    
    return null; // No movement or powerup collected
  }

}

module.exports = Player