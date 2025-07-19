

// function GameLoop(){
//     UpdateDom()
//     requestAnimationFrame(GameLoop)
// }

import {LogPage} from "./dom.js"


const ws = new WebSocket('ws://127.0.0.1:5500');


ws.onopen = () => {
    // ws.send("heelo back")
    console.log("opeeeen");
  const ll =   LogPage()
  console.log("lllllllll" , ll);
  
    
}

ws.onmessage = (e) => {
    console.log("recieved msg : ", e.data);
    
    
}

ws.onclose = (e) => {
        console.log("clooose");

    console.log("recieved msg : ", e.data);
    
}
window.ws = ws