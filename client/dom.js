import { Component, useState } from './MiniFramework/app/state.js';
import { createElement } from './MiniFramework/app/dom.js';
import { eventManager } from './MiniFramework/app/events.js'
var root = document.querySelector("#root")

// export function LogPage() {
//     console.log("rooot", root);

//     eventManager.addevent("keydown", ".NameInput", (e) => {
//         if (e.key == "Enter") {
//             ws.send(JSON.stringify({ signal: "NewUser", name: e.target.value }))
//         }
  
//     })
//     return new Component({}, root, () => {
//         return (createElement("input"
//             , { type: "text", class: "NameInput", placeholder: "Enter Your Name" }
//         )
//         )
//     })
// }
export function LogPage() {
        let shouldShowLogin = true;
    //const [isVisible, setIsVisible] = useState(true);
    eventManager.addevent("keydown", ".login-input", (e) => {
        if (e.key == "Enter" && e.target.value.trim()) {
            if (window.ws && window.ws.readyState === WebSocket.OPEN) {
                window.ws.send(JSON.stringify({ 
                    signal: "NewUser", 
                    name: e.target.value 
                }));
                const loginElement = document.querySelector('.login-overlay');
                if (loginElement) {
                    loginElement.style.display = 'none';
                }
                //setIsVisible(false);
            }
        }
    });
    
    return new Component({}, root, () => {
        //if (!isVisible()) return null;
        return createElement("div", { class: "login-overlay" },
            createElement("div", { class: "login-box" },
                createElement("h1", { class: "login-title" }, "BOMBERMAN"),
                createElement("input", {
                    type: "text",
                    class: "login-input",
                    placeholder: "Enter Your Nickname"
                }),
                createElement("p", { class: "login-instruction" }, 
                    "Press ENTER to join the battle"
                )
            )
        );
    });
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

eventManager.addevent("keydown", (e) => {
    console.log("keeey", e.key);
    
    if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
        e.key === "ArrowRight" || e.key === "ArrowLeft") {
        ws.send(JSON.stringify({ signal: "PlayerMovement", Direction: e.key.slice(5) }))
         }else if (e.code === "Space") {
        console.log("booooooomb");

        ws.send(JSON.stringify({ signal: "Bomb" }))
    }
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

