const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');
const port = 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

wss.on("connection", (ws) => {
  const userId = uuidv4()
  console.log(`User Connected ${userId}`);
  
  // ws.on('join_room',(data)=>{
  //   ws.join(data)
  //   console.log(`user with ID:${userId} joined room:${data}`)
  //  })

  ws.on("message", (message) => {
    console.log(`message received ${message}`)
  });

  ws.on("close", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
