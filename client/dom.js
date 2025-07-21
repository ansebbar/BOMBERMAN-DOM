import { Component, useState } from './MiniFramework/app/state.js';
import { createElement } from './MiniFramework/app/dom.js';
import { eventManager } from './MiniFramework/app/events.js'
var root = document.querySelector("#root")

export function LogPage() {
    console.log("rooot", root);

    eventManager.addevent("keydown", ".NameInput", (e) => {
        if (e.key == "Enter") {
            ws.send(JSON.stringify({ signal: "NewUser", name: e.target.value }))
        }
        if (e.key == "m") {
            ws.send(JSON.stringify({ signal: "Map" }))
        }

    })
    return new Component({}, root, () => {
        return (createElement("input"
            , { type: "text", class: "NameInput", placeholder: "Enter Your Name" }
        )
        )
    })
}


export function Map(props) {

    console.log("mppp", props.grid[7].length);

    const styles = {
        "WALL": "WALL-cliff",
        "BLOCK": "BLOCK-snow-rock ",
        "EMPTY": "rock-blue "
    }

    return new Component({ props }, root, () => {
        return (
            createElement("div", { class: "Map_container", style: 'display:grid' },
                (props.grid.map(line =>
                    line.map(block => createElement("div", { class: `tile ${styles[block]}` }))
                )
                )
            )
        )
    })
}


export function Player(props) {
    return new Component({ props }, root, () => {
        return (
            createElement("div", { class: "Player" })
        )
    })
}

eventManager.addevent("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
        e.key === "Arrow" || e.key === "ArrowLeft") ws.send(JSON.stringify({ signal: "PlayerMovement", Direction: e.key.slice(5) }))
})




// function Movement( key) {

//    const PlayerDom  = root.querySelector(".Player")
//    switch (key) {
//     case "ArrowUp":
//             console.log("eveeeeeeent trigerd");

//         PlayerDom.style.transform = `translateY(${-50}px)`
//         break;

//     default:
//         break;
//    }

// }

 export var GameHandler 
export const Game = new Component("div", root, () => {

    const [gameState, setGameState] = useState({ phase: 'waiting', players: [], map: [], bombs: [] });
    if (!GameHandler) GameHandler = setGameState
    return (

        createElement("div", { class: "gameContainer" },

            gameState().players.length > 0 &&
            createElement("div", { class: "Player" , style:`left:${gameState().players[0].x * 16}px`} , "pl1")
        )

    )
})

