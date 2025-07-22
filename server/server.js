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
            this.gameHandler.map = new Map()
            const pl = new Player(data.name, this.gameHandler.map)
            this.gameHandler.addplayer(pl)


            break;
          case "Map":
          // const map = new Map()
          // console.log("maaap", map);
          // this.SendData(JSON.stringify({ signal: "Map", data: map }))

          case "PlayerMovement":

            const Direction = JSON.parse(message).Direction
            this.gameHandler.players[0].move(Direction , this.gameHandler.activeBombs.map(b => b.position))
            // console.log(JSON.parse(message));
            break;


          case "Bomb":
            if (this.gameHandler.activeBombs.filter(UserBmb => this.gameHandler.players[0].id == UserBmb.ownerId).length < this.gameHandler.players[0].stats.bCount) {
              const bmb = this.gameHandler.players[0].layBomb()
              this.gameHandler.activeBombs.push(bmb)
              setTimeout(() => {
                // console.log("removed", this.gameHandler.activeBombs);

                const Explode = (range) => {
                  let damaged = false
                  for (let i = 1; i <= range; i++) {
                    this.gameHandler.map.inMapBound(bmb.position.x, bmb.position.y + i) ?
                      (this.gameHandler.map.grid[bmb.position.y + i][bmb.position.x] === "EMPTY") ?
                        this.gameHandler.map.setCell(bmb.position.x, bmb.position.y + i, "BLOCK") : null : null

                    this.gameHandler.map.inMapBound(bmb.position.x, bmb.position.y - i) ?
                      (this.gameHandler.map.grid[bmb.position.y - i][bmb.position.x] === "EMPTY") ?
                        this.gameHandler.map.setCell(bmb.position.x, bmb.position.y - i, "BLOCK") : null : null

                             this.gameHandler.map.inMapBound(bmb.position.x+i, bmb.position.y ) ?
                      (this.gameHandler.map.grid[bmb.position.y ][bmb.position.x+i] === "EMPTY") ?
                        this.gameHandler.map.setCell(bmb.position.x+i, bmb.position.y, "BLOCK") : null : null

                        this.gameHandler.map.inMapBound(bmb.position.x-i, bmb.position.y ) ?
                      (this.gameHandler.map.grid[bmb.position.y ][bmb.position.x-i] === "EMPTY") ?
                        this.gameHandler.map.setCell(bmb.position.x-i, bmb.position.y, "BLOCK") : null : null


                    this.gameHandler.players.forEach(pl => {

                      if ((((pl.position.x === bmb.position.x && pl.position.y === bmb.position.y) && i === 1 )||
                        (pl.position.x === bmb.position.x + i && pl.position.y === bmb.position.y) ||
                        (pl.position.x === bmb.position.x - i && pl.position.y === bmb.position.y) ||
                        (pl.position.x === bmb.position.x && pl.position.y === bmb.position.y + i) ||
                        (pl.position.x === bmb.position.x && pl.position.y === bmb.position.y - i))) {
                        pl.lives -= 1
                        damaged = true
                      }

                      console.log("liiiifes" , pl.lives);
                      
                    })

                    

                  }



                }
                Explode(this.gameHandler.players[0].stats.range)
                this.gameHandler.activeBombs = this.gameHandler.activeBombs.filter(UserBmb => UserBmb.ownerId != bmb.ownerId)
              }, 2000);
            }


            break;


        }


      })


      this.ws.on("close", () => {
        console.log('Client disconnected');

      })


    })




  }

}
const wss = new Socket(5500)

