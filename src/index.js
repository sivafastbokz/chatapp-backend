const express = require('express');
const app = express();
const http = require('http');
const port = 5000;
const cors = require('cors');
const {Server} = require('ws');

app.use(cors());
const server = http.createServer(app)

const ws_server = new Server({ noServer: true });

ws_server.on('connection',(socket)=>{
console.log(`Client connected: ${socket.id}`);

socket.on('message',(message)=>{
 console.log(`Received message: ${message}`);

});

socket.on('disconnect',()=>{
    console.log('User Disconnected', socket.id);
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