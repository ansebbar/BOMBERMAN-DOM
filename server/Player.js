class Player{
    constructor(name , map){
        this.name = name
        this.id = Math.floor(Date.now() * Math.random()).toFixed()
        this.position = {x:1 , y:1}
        this.stats = {speed:5 , range:1 , bCount:1}
        this.lives = 3
        this.map = map
    }
    layBomb(){

    }



    move(dir){
        
        
                switch (dir) {
              case "Up":
                // console.log("fllll" , this.map.grid ,this.map.grid.flat() ,  this.map.grid.flat()[this.position.y-1] );
                
                // this.map.grid[this.position.y-1][this.position.x] == "EMPTY" && (this.position.y -= 1.5)
                console.log("POOOOS", this.map.grid[this.position.y-1][this.position.x]);
                
                        if((this.position.y-1 >= 1 && this.position.y <= this.map.grid.length-1) && this.map.grid[this.position.y-1][this.position.x] == "EMPTY" )   this.position.y -= 1
                
                                        break
              case "Down":
                this.position.y += 1
                break

              case "Left":
                console.log("immm here");

                this.position.x -= 1.5
                break


              case "Right":
                this.position.x += 1
                break;
    }
}

}

module.exports = Player