const express = require('express');
const app = express();
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const {Server} = require('ws');
const port = 5000;


app.use(cors());
const server = http.createServer(app)

const ws_server = new Server({ 
  noServer: true,
});

ws_server.on('connection',(socket)=>{
  const userId = uuidv4()
console.log(`Client connected: ${userId}`);

socket.on('message',(message)=>{
 console.log(`Received message: ${message}`);

});

socket.on('disconnect',()=>{
    console.log(`Client disconnected: ${userId}`);
})
});

server.on('upgrade', (request, socket, head) => {
    ws_server.handleUpgrade(request, socket, head, (socket) => {
      ws_server.emit('connection', socket, request);
    });
  });

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})