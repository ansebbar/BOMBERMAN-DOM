class Bomb{
    constructor(ownerId , position , range){
        this.position = position
        this.ownerId = ownerId
        this.range = range
    }

    Explostion(){
        setTimeout(()=>{"exploded"} , 2000)
    }
}