

// function GameLoop(){
//     UpdateDom()
//     requestAnimationFrame(GameLoop)
// }

import { LogPage, Map, Player } from "./dom.js"
import { useState, Component } from "./MiniFramework/app/state.js"
import { createElement } from './MiniFramework/app/dom.js';


const ws = new WebSocket('ws://127.0.0.1:5500');
var root = document.querySelector("#root")

  var GameHandler 
 const Game = new Component("div", root, () => {

    const [gameState, setGameState] = useState({ phase: 'waiting', players: [], map: [], bombs: [] });

    if (!GameHandler) GameHandler = setGameState
            console.log(gameState() , "staaaaaaaaaaaate");

    return (

        
        createElement("div", { class: "gameContainer" },
            gameState().players.length > 0 &&
            createElement("div", { class: "Player" , style:`top:${gameState().players[0].position.y+1 * 16}px ; left:${gameState().players[0].position.x+1 * 16}px` } , "pl1")
        )

    )
})

ws.onopen = () => {
    // ws.send("heelo back")
    const ll = LogPage()


}

ws.onmessage = (e) => {

    var data
    if (e.data) data = JSON.parse(e.data)
    console.log(data, "dddddd");

    if (data.signal == "Map") {

        const map = Map(data.data)
        console.log("mpp", map);
    }
    if (data.signal == "Player") {

        const player = Player(data.data)

    }
    if (data.signal == "Snap") {
        console.log("snaaaaaaaaaaap");
        
        GameHandler(data.data)
    }



}

ws.onclose = (e) => {
    console.log("clooose");

    console.log("recieved msg : ", e.data);

}
window.ws = ws






// function GameLoop() {   
   
//     requestAnimationFrame(GameLoop)

// }

// GameLoop()



