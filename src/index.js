const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const port = 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

const rooms = new Map();

wss.on('connection', (ws) => {
  const userId = uuidv4()
  console.log(`User Connected ${userId}`);
  
  ws.on('message', (message) => {
    console.log(`message received:${message}`)
    const messageData = JSON.parse(message);
    const roomName = messageData.room;
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Set());
    }
    rooms.get(roomName).add(ws);

    rooms.get(roomName).forEach((client)=>{
      const responseMessage = {
        author: messageData.author,
        room:roomName,
        message:`${messageData.message}`,
        time:messageData.time,
     };
     client.send(JSON.stringify(responseMessage));
    })
  });

  ws.on('close', () => {
    rooms.forEach((participants, roomName) => {
      participants.delete(ws);
      if (participants.size === 0) {
        rooms.delete(roomName);
      }
    });
    console.log('User Disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
