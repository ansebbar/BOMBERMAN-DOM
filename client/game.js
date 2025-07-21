

// function GameLoop(){
//     UpdateDom()
//     requestAnimationFrame(GameLoop)
// }

import { LogPage, Map, Player , GameHandler , Game } from "./dom.js"
import { useState , Component} from "./MiniFramework/app/state.js"


const ws = new WebSocket('ws://127.0.0.1:5500');

var player = {}

ws.onopen = () => {
    // ws.send("heelo back")
    const ll = LogPage()


}

ws.onmessage = (e) => {

    var data
    if (e.data) data = JSON.parse(e.data)
        console.log(data , "dddddd");
        
    if (data.signal == "Map") {

        const map = Map(data.data)
        console.log("mpp", map);
    }
    if (data.signal == "Player") {

        const player = Player(data.data)

    }
    if (data.signal == "Snap"){
        GameHandler(data.data)
    }



}

ws.onclose = (e) => {
    console.log("clooose");

    console.log("recieved msg : ", e.data);

}
window.ws = ws


function GameLoop(){
Game()
requestAnimationFrame(GameLoop)

}

GameLoop()