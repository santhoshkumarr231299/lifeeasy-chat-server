import express, { Application } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
 
//For env File 
dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', (msg) => {
    console.log('chat message', msg);
    io.emit('receive_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//server config
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});