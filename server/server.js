const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const GameHandle = require("./Gamestate.js");
const Player = require("./Player.js");
const Mapp = require("./map.js");

class Socket {
  constructor(wsss) {
    this.clients = new Map()
    this.wss = wsss;
    this.MakeAndConnect(this.wss);
  }

  SendToClient(id, data) {
    const cl = this.clients.get(id)

    if (cl.readyState === WebSocket.OPEN) { cl.send(data) }
  }
  SendData(data) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  MakeAndConnect(wss) {
    wss.on("connection", (ws) => {
      const ClientId = Math.floor(Date.now() * Math.random()).toFixed()
      this.clients.set(ClientId, ws)
      this.SendToClient(ClientId, JSON.stringify({ signal: "ClientId", ClientId: ClientId }))
      this.ws = ws;
      gameHandler.ws = this; // Link gameHandler to this socket

      this.ws.on("message", (message) => {
        const data = JSON.parse(message);

        switch (data.signal) {
          case "NewUser":
            if (!gameHandler.map) {
              // console.log("cllllllllllllllll" , this.wss.clients);

              gameHandler.map = new Mapp();
            }
            const pl = new Player(data.name, gameHandler.map, gameHandler.PlayersPos[gameHandler.players.length], ClientId);
            gameHandler.addplayer(pl);

            // console.log("plllllllllll", gameHandler.players, "iddd", gameHandler.id);
            break;

          case "PlayerMovement":
            const Direction = JSON.parse(message).Direction;
            gameHandler.players.find(p => p.id == (JSON.parse(message).ClientId)).move(Direction, gameHandler.activeBombs.map(b => b.position))

              ;
            break;

          case "Bomb":
            const currentPlayer = gameHandler.players.find(p => p.id == (JSON.parse(message).ClientId))

            if (
              gameHandler.activeBombs.filter(
                b => currentPlayer.id == b.ownerId
              ).length < currentPlayer.stats.bCount
            ) {
              const bmb = currentPlayer.layBomb();
              gameHandler.activeBombs.push(bmb);

              setTimeout(() => {
                const Explode = (range) => {
                  for (let i = 1; i <= range; i++) {
                    // Directions: down, up, right, left
                    if (gameHandler.map.inMapBound(bmb.position.x, bmb.position.y + i) &&
                      gameHandler.map.grid[bmb.position.y + i][bmb.position.x] === "EMPTY") {
                      gameHandler.map.destroyBlock(bmb.position.x, bmb.position.y + i)
                      // gameHandler.map.setCell(bmb.position.x, bmb.position.y + i, "BLOCK");
                    }
                    if (gameHandler.map.inMapBound(bmb.position.x, bmb.position.y - i) &&
                      gameHandler.map.grid[bmb.position.y - i][bmb.position.x] === "EMPTY") {
                      gameHandler.map.destroyBlock(bmb.position.x, bmb.position.y - i)

                      // gameHandler.map.setCell(bmb.position.x, bmb.position.y - i, "BLOCK");
                    }
                    if (gameHandler.map.inMapBound(bmb.position.x + i, bmb.position.y) &&
                      gameHandler.map.grid[bmb.position.y][bmb.position.x + i] === "EMPTY") {
                      // gameHandler.map.setCell(bmb.position.x + i, bmb.position.y, "BLOCK");
                      gameHandler.map.destroyBlock(bmb.position.x+1, bmb.position.y )

                    }
                    if (gameHandler.map.inMapBound(bmb.position.x - i, bmb.position.y) &&
                      gameHandler.map.grid[bmb.position.y][bmb.position.x - i] === "EMPTY") {
                      // gameHandler.map.setCell(bmb.position.x - i, bmb.position.y, "BLOCK");
                      gameHandler.map.destroyBlock(bmb.position.x-1, bmb.position.y)

                    }

                    gameHandler.players.forEach(pl => {
                      if (
                        ((pl.position.x === bmb.position.x && pl.position.y === bmb.position.y) && i === 1) ||
                        (pl.position.x === bmb.position.x + i && pl.position.y === bmb.position.y) ||
                        (pl.position.x === bmb.position.x - i && pl.position.y === bmb.position.y) ||
                        (pl.position.x === bmb.position.x && pl.position.y === bmb.position.y + i) ||
                        (pl.position.x === bmb.position.x && pl.position.y === bmb.position.y - i)
                      ) {
                        pl.lives -= 1;
                        if (pl.lives === 0) { gameHandler.removeplayer(pl.id) }
                      }

                      console.log("liiiifes", pl.lives);
                    });
                  }
                };

                Explode(currentPlayer.stats.range);
                gameHandler.activeBombs = gameHandler.activeBombs.filter(
                  b => b.ownerId != bmb.ownerId
                );
              }, 2000);
            }
            break;
        }
      });

      this.ws.on("close", () => {
        console.log('Client disconnected');
      });
    });
  }
}

// === Initialize server properly ===
const wss = new WebSocket.Server({ port: 5500 });
var gameHandler = new GameHandle(null);   // Create the global Gamestate instance
const ws = new Socket(wss);               // Create WebSocket manager
gameHandler.ws = ws;                      // Link Gamestate to the WebSocket manager
