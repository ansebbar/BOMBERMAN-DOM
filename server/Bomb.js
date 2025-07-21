class Bomb{
    constructor(ownerId , position , range){
        this.position = JSON.parse(JSON.stringify(position))
        this.ownerId = ownerId
        this.range = range
        this.timer = 2000
        this.Explostion()
        console.log(position , "bmbmbmb psooos");
        
    }

    Explostion(){
        setTimeout(()=>{"exploded"} , this.timer)
    }
}

module.exports = Bomb
