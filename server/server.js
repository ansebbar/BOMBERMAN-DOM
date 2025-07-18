const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const GameHandle = require("./Gamestate.js")
const player = require("./Player.js")

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

const wss = new WebSocket.Server({ port:8080 });

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

// server.listen(8080, () => {
//   console.log(' Server running at http://localhost:8080');
// });
