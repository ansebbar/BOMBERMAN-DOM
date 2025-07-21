
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

    const styles = {
        "WALL": "WALL-purple-rock",
        "BLOCK": "WALL-ice  ",
        "EMPTY": "ice-rock "
    }

    const [gameState, setGameState] = useState({ phase: 'waiting', players: [], map: [], bombs: [] });

    if (!GameHandler) GameHandler = setGameState
            console.log(gameState() , "staaaaaaaaaaaate");

    return (

    createElement("div", { class: "gameContainer" }, 
   
      
            gameState().players.length > 0 &&
      createElement("div", {
        class: "Player",
        style: `
          transform: translate(
            ${gameState().players[0].position.x * 60}px, 
            ${gameState().players[0].position.y * 60}px
          );
        `
      }, "pl1"),
     
    // Map container with grid tiles
    gameState().map?.grid?.length > 0 &&
      createElement("div", { class: "Map_container", style: 'display: grid' }, 
        gameState().map.grid.flatMap(line =>
          line.map(block =>
            createElement("div", { class: `tile ${styles[block]}` })
          )
        )
      ),


          gameState().bombs.length > 0 && 
      gameState().bombs.map(bmb =>
        createElement("div" , {class:"bomb", style:`left:${bmb.position.x*60}px ; top:${bmb.position.y*60}px `}, "bomb")
      ) , 

  
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