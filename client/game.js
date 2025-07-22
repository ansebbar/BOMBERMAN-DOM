
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
  export var ClientId

 const Game = new Component("div", root, () => {

    const styles = {
        "WALL": "WALL-purple-rock",
        "BLOCK": "WALL-ice  ",
        "EMPTY": "ice-rock "
    }

    const [gameState, setGameState] = useState({ phase: 'waiting', players: [], map: [], bombs: []  , timer:-1});

    if (!GameHandler) GameHandler = setGameState
            console.log(gameState() , "staaaaaaaaaaaate");


    const childs = []
    if (gameState().timer >= 0){
      childs.push( createElement("p" , {class:"timer"},`${Math.ceil( gameState().timer/1000)}s`))
    }
    if (gameState().phase === "running"){
childs.push(
   createElement("div", {}, [

      // Player
      gameState().players.length > 0 &&
        gameState().players.map((pl , index) => 
        {   
          return createElement("div", {
        class: "Player",
        style: `
          transform: translate(
            ${pl.position.x * 60}px, 
            ${pl.position.y * 60}px
          );
        `
      }, `PLayer${index+1}`)}
        )
,

      // Map Grid
      gameState().map?.grid?.length > 0 &&
      createElement("div", { class: "Map_container", style: 'display: grid' },
        gameState().map.grid.flatMap(line =>
          line.map(block =>
            createElement("div", { class: `tile ${styles[block]}` })
          )
        )
      ),

      // Bombs
      gameState().bombs.length > 0 &&
      gameState().bombs.map(bmb =>
        createElement("div", {
          class: "bomb",
          style: `left:${bmb.position.x * 60}px; top:${bmb.position.y * 60}px`
        }, "bomb")
      )
    ])
)
    }
    return (
  createElement("div", { class: "gameContainer" },

...childs
  )
)

})

ws.onopen = (e) => {

//  const rr = JSON.parse(e)
//     console.log("cliiiiiiiientID", e);
//   if (!ClientId){
//         // ClientId = data.data.ClientId
        
//       }
    
    const ll = LogPage()


}

ws.onmessage = (e) => {

    var data
    if (e.data) data = JSON.parse(e.data)

    if (data.signal == "ClientId") {
      
      if (!ClientId){
        ClientId = data.ClientId
      }
      console.log(ClientId , "dfsdfsdf");
    }

    if (data.signal == "Snap") {
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