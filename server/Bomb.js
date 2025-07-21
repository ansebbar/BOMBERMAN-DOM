class Bomb{
    constructor(ownerId , position , range){
        this.position = position
        this.ownerId = ownerId
        this.range = range
        this.timer = 2000
        this.Explostion()
    }

    Explostion(){
        setTimeout(()=>{"exploded"} , this.timer)
    }
}

module.exports = Bomb
