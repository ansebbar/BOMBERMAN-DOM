class player{
    constructor(){
        this.id = Math.floor(Date.now() * Math.random()).toFixed()
        this.position = {x:0 , y:0}
        this.stats = {speed:5 , range:1 , bCount:1}
        this.lives = 3
    }
    layBomb(){

    }

    move(dir){

    }
    
}