import { Component, useState } from './MiniFramework/app/state.js';
import { createElement } from './MiniFramework/app/dom.js';
import { eventManager } from './MiniFramework/app/events.js'
import { ClientId , gameData } from './game.js';
var root = document.querySelector("#root")



export function LogPage() {
    console.log("rooot", root);

    eventManager.addevent("keydown", ".NameInput", (e) => {
        if (e.key == "Enter") {
            ws.send(JSON.stringify({ signal: "NewUser", name: e.target.value }))
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

