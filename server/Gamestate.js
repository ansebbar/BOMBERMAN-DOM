const { log, time } = require("node:console")

class Gamestate {
    constructor(ws) {
        this.id = Math.random()
        this.ws = null
        this.players = []
        this.activeBombs = []
        this.map = null
        this.phase = "waiting"
        this.tick()
        this.countdown = 10000
        this.roomTimout = 20000
        
    }

    addplayer(player) {
        if (this.players.length < 4) {
            this.players.push(player)
        }

    }
    removeplayer(playerId) {
        this.players.filter(p => p.id !== playerId)

    }

    takeSnapshot() {
        const Timer = (this.phase === "waiting" && this.roomTimout < 20000 && this.roomTimout > 0) ?
            this.roomTimout : (this.phase === "waiting" && this.countdown < 10000 && this.countdown > 0)
                ? this.countdown : null
        const snapShot = { players: this.players, phase: this.phase, bombs: this.activeBombs, map: this.map, timer: Timer }
        // const data = this.phase === 'waiting' ? 'waiting' : "dataat"    
        this.ws.SendData(JSON.stringify({ signal: "Snap", data: snapShot }))
    }
    tick() {
        setInterval(() => {
            // this.countdown -= 1000/30
            if (this.players.length >= 2 && this.players.length < 4 && this.roomTimout > 0) { this.roomTimout -= 1000 / 30 }
            else if ((this.players.length === 4 || this.roomTimout <= 0) && this.countdown > 0) {
                this.roomTimout = 0
                this.countdown -= 1000 / 30
            }
            else if (this.countdown <= 0) { this.phase = "running" }
            this.takeSnapshot()
        }, 1000 / 30);
    }
}
module.exports = Gamestate
