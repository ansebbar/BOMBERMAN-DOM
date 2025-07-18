import { Component, useState } from './MiniFramework/app/state.js';
import { createElement } from './MiniFramework/app/dom.js';
import { eventmanager } from './MiniFramework/app/events.js'
var root = document.querySelector("#root")
function LogPage() {
    eventmanager.addevent("keydown", (e) => {
        if (e.key == "Enter") {
            console.log("Youuu Subimited Name");
        }
    })
    return new Component("input", root, () => {
        createElement("input"
            , { type: "text", class: "NameInput", placeholder: "Enter Your Name" }
        )
    })

}
LogPage()