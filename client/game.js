

// function GameLoop(){
//     UpdateDom()
//     requestAnimationFrame(GameLoop)
// }

        const ws = new WebSocket('ws://localhost:8080');


        ws.onopen = () => {
            // ws.send("heelo back")
        }

        ws.onmessage = (e) => {
            console.log("recieved msg : ", e.data);


        }

        ws.onclose = (e) => {
            console.log("recieved msg : ", e.data);

        }