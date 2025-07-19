

// function GameLoop(){
//     UpdateDom()
//     requestAnimationFrame(GameLoop)
// }

import { LogPage, Map } from "./dom.js"


const ws = new WebSocket('ws://127.0.0.1:5500');


ws.onopen = () => {
    // ws.send("heelo back")
    console.log("opeeeen");
    const ll = LogPage()
    console.log("lllllllll", ll);


}

ws.onmessage = (e) => {
    // console.log("recieved msg : ", e.data);
    // console.log("dt", JSON.parse(e.data));
    var data
    if (e.data) data = JSON.parse(e.data)
        console.log(data , "dddddd");
        
    if (data.signal == "Map") {

        const map = Map(data.data)
        console.log("mpp", map);
    }


}

ws.onclose = (e) => {
    console.log("clooose");

    console.log("recieved msg : ", e.data);

}
window.ws = ws