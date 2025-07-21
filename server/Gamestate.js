const { log } = require("node:console")

 class Gamestate{
    constructor(ws){
        this.ws = ws
        this.players = []
        this.activeBombs = []
        this.map = null
        this.phase = "waiting"
        this.tick()        
    }

    addplayer(player){
        if (this.players.length < 4){
            this.players.push(player)
        }

    }
    removeplayer(playerId){
        this.players.filter(p => p.id !== playerId)

    }

    takeSnapshot(){

        const snapShot = {players : this.players , phase:this.phase , bombs:this.activeBombs }
    // const data = this.phase === 'waiting' ? 'waiting' : "dataat"    
    this.ws.SendData(JSON.stringify({signal:"Snap" , data:snapShot}))
    }
    tick(){
        setInterval(() => {
         this.takeSnapshot()   
        }, 1000/30);
    }
}
module.exports = Gamestate
