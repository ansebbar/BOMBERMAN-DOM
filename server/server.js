const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const GameHandle = require("./Gamestate.js")
const player = require("./Player.js")

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, '../client/index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log(' Client connected');

  const gameHandler = new GameHandle(ws)
  ws.on('message', function incoming(message) {
    console.log(' Received:', message.toString());

    ws.send(`You said: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log(' Server running at http://localhost:8080');
});
