import { Component, useState } from './MiniFramework/app/state.js';
import { createElement } from './MiniFramework/app/dom.js';
import { eventManager } from './MiniFramework/app/events.js'
var root = document.querySelector("#root")

export function LogPage() {
    console.log("rooot", root);

    eventManager.addevent("keydown", ".NameInput",  (e) => {
        if (e.key == "Enter") {
            console.log("Youuu Subimited Name");
            ws.send("NewPlayer")
        }
    })
    return new Component({}, root, () => {
        return createElement("input"
            , { type: "text", class: "NameInput", placeholder: "Enter Your Name" }
        )
    })

}
