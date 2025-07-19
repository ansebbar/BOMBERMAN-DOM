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

    console.log( "mppp" , props.grid[7].length);
    

    return new Component({ props }, root, () => {
        return (
            createElement("div", { class: "Map_container", style: 'display:grid' },
                (props.grid.map(line =>
                    line.map(block => createElement("div", {class: `tile ${block}`}))
                )
                )
            )
        )
    })
}