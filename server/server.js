const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const GameHandle = require("./Gamestate.js")
const Player = require("./Player.js")
const Map = require("./map.js");
// const { log } = require('console');
// const { json } = require('stream/consumers');

// const Public__Dir = path.join(__dirname, '..client')
// function readAllfiles(path){

//   fs.readdir(Public__Dir, {} ,(err, data) => {
//     if (err) {
//       console.log("error:", err);
//     }else{
//       data.forEach(fl=>{
// zzz

//       })
//     }

//   })
// }
// const server = http.createServer((req, res) => {




// const ext = path.extname(req.url)
// const mimeType = {
//   ".js":"application/javascript",
//   ".css":"text/css" ,
//   ".html":"text/html",
// }

// const filePath = path.join(__dirname, '../client');
// if (req.url === './') {
//   filePath = path.join(__dirname, '../client/index.html')
// }
// console.log(filePath);

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.writeHead(500);
//       res.end('Internal Error');
//     } else {
//       res.writeHead(200, { 'Content-Type': ext[mimeType] });
//       res.end(data);
//     }
//   });

// });



class Socket {
  constructor(port) {
    this.port = port
    this.ws = null
    this.gameHandler = null
    this.MakeAndConnect()
  }

  SendData(data) {
    this.ws.send(data)
  }

  MakeAndConnect() {
    const wss = new WebSocket.Server({ port: this.port });
    wss.on("connection", (ws) => {
      this.ws = ws
      this.gameHandler = new GameHandle(this)


      this.ws.on("message", (message) => {
        const data = JSON.parse(message)

        switch (data.signal) {
          case "NewUser":
            const pl = new Player(data.name)
            this.gameHandler.addplayer(pl)
            console.log(this.gameHandler.players);


            break;
          case "Map":
            const map = new Map()
            console.log("maaap", map);
            this.SendData(JSON.stringify({ signal: "Map", data: map }))

          case "PlayerMovement":

              const dd = JSON.parse(message).Direction
              switch (dd) {
                case "Up" || "Down":
                    this.gameHandler.players[0].position.y = this.gameHandler.players[0].position.y+1 
                  break;
              
                default:
                  break;
              } 
            console.log(JSON.parse(message));
            
   
        }
      })


      this.ws.on("close", () => {
        console.log('Client disconnected');

      })


    })




  }

}
const wss = new Socket(5500)

