// === Imports ===
import { LogPage } from "./dom.js"
import { useState, Component } from "./MiniFramework/app/state.js"
import { eventManager } from "./MiniFramework/app/events.js"

import { createElement } from './MiniFramework/app/dom.js';
import { Chat } from "./Chat.js";

// === DOM Mount ===
const root = document.querySelector("#root");

// === WebSocket ===
const ws = new WebSocket('ws://127.0.0.1:5500');
const chat = new Chat(ws);
var PlayerState
var enableChat
var IsPLayer
export let ClientId;
let GameHandler = null;
export let gameData  // live game state for GameLoop







eventManager.addevent("keydown", ".NameInput", (e) => {
  if (e.key == "Enter") {
    ws.send(JSON.stringify({ signal: "NewUser", name: e.target.value }))
  }
})


// === Game Component ===
const Game = new Component("div", root, () => {
  const styles = {
    "WALL": "WALL-purple-rock",
    "BLOCK": "WALL-ice",
    "EMPTY": "ice-rock"
  };
  const [PlayerStat , SetPlayerState] = useState("alive")
if (!PlayerState) PlayerState = SetPlayerState;
  const [chatView, SetChatView] = useState(false)
  const [gameState, setGameState] = useState({
    phase: "",
    players: [],
    map: { grid: [], powerUps: [] },
    bombs: [],
    timer: -1
  });
  IsPLayer = chatView()
  if (!GameHandler) GameHandler = setGameState;
//    if (PlayerStat() === "dead") {
//       console.log({"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh":h});
      
//       return
//     }

//     if((!gameState().players.some(pl => pl.id == ClientId )) && gameState().phase == "running"){
      
// SetPlayerState("dead")
//     }

   
  
  
  if (!enableChat) {
    enableChat = SetChatView
  }
  // Set external references
  gameData = gameState();
  const children = [];
  if (chatView()) children.push(chat.render())
  if (gameData.timer >= 0) {
    children.push(createElement("p", { class: "timer" }, `${Math.ceil(gameData.timer / 1000)}s`));
  }

  if (gameState().phase === "waiting" && !chatView()) {
    children.push(createElement("input"
      , { type: "text", class: "NameInput", placeholder: "Enter Your Name" }
    )
    )
  }

if(PlayerStat() != "alive") {
   return createElement("div", { class: "gameContainer" }, 
createElement("div", {class:"dead"}, "YOU LOST")
   );
  
}

  if (gameData.phase === "running") {
    children.push(createElement("div", {}, [
      // Players
      ...gameData.players.map((pl, index) => {
        const pos = pl.currentPosition || pl.position; // Use interpolated position
        return createElement("div", {
          class: "Player",
          style: `
                        transform: translate(${pos.x * 60}px, ${pos.y * 60}px);
                        transition: none;
                    `
        }, `Player${index + 1}`);
      }),

      // Map
      createElement("div", { class: "Map_container", style: 'display: grid' },
        gameData.map.grid?.flatMap(line =>
          line.map(block =>
            createElement("div", { class: `tile ${styles[block]}` })
          )
        )
      ),

      // Bombs
      ...gameData.bombs.map(bmb =>
        createElement("div", {
          class: "bomb",
          style: `left:${bmb.position.x * 60}px; top:${bmb.position.y * 60}px`
        }, "bomb")
      ),

      // PowerUps
      ...(gameData.map.powerUps ?? []).map(pwr =>
        createElement("div", {
          class: "powerUp",
          style: `left:${pwr.position.x * 60}px; top:${pwr.position.y * 60}px`
        }, "powerUp")
      )
    ]));
  }


  return createElement("div", { class: "gameContainer" }, ...children);
});
let lastTime = performance.now();

function GameLoop(now) {
  const delta = now - lastTime;
  lastTime = now;

  if (gameData?.phase === "running") {
    // 🕒 Timer update
    if (gameData.timer > 0) {
      GameHandler(prev => ({
        ...prev,
        timer: Math.max(0, prev.timer - delta)
      }));
    }

    // 🎮 Smooth Player Movement (interpolation)
    const updatedPlayers = gameData.players.map(pl => {
      const current = pl.currentPosition || pl.position;
      const target = pl.position;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const speed = pl.stats.speed * delta / 1000;

      if (dist < 0.01) {
        return { ...pl, currentPosition: target };
      }

      const ratio = Math.min(1, speed / dist);

      return {
        ...pl,
        currentPosition: {
          x: current.x + dx * ratio,
          y: current.y + dy * ratio
        }
      };
    });

    GameHandler(prev => ({
      ...prev,
      players: updatedPlayers
    }));
  }

  requestAnimationFrame(GameLoop);
}
requestAnimationFrame(GameLoop);

window.ws = ws
window.gameData = gameData
ws.onopen = () => {
};

ws.onmessage = (e) => {
  // if (!e.data) return;
  const msg = JSON.parse(e.data);
  // console.log("mmmmmm", msg);
  if (msg.signal === "ChatMessage") {
    console.log("msgggg", msg);

    chat.handleIncomingMessage(msg);
  }
  if (msg.signal === "ClientId" && !ClientId) {
    ClientId = msg.ClientId;
    console.log("ClientId:", ClientId);
  }

  if (msg.signal === "Snap") {
    GameHandler(msg.data);
  }

  if (msg.signal === "enableChat") {
    enableChat(true)
  }

  if(msg.signal === "YouLost"){
    console.log({"msg": msg.signal});
    console.log({"my pl": msg.data});
      PlayerState("dead");
  }

};

ws.onclose = (e) => {
  console.log("WebSocket closed", e.data);
};
eventManager.addevent("keydown", (e) => {

    if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
        e.key === "ArrowRight" || e.key === "ArrowLeft") {
        ws.send(JSON.stringify({ signal: "PlayerMovement", Direction: e.key.slice(5) , ClientId: ClientId }))
         }else if (e.code === "Space") {

        ws.send(JSON.stringify({ signal: "Bomb" , ClientId: ClientId}))
    }
 

    

})