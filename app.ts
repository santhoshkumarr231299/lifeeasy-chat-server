import express, { Application } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
 
//For env File 
dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', async (msg) => {
    const options = {
      headers : {
        authorization : socket.handshake.auth.token,
      }
    }

    const res = await axios.post(process.env.APP_SERVER_URL + "/integration/get-user-auth", {}, options);
    if(res.data.status == 'success') {
      const date : string[] = new Date().toString().split(" ");
      const resMsg = {
        message : msg.message,
        user : res.data.username,
        time : date[4] + " " + date[5],
      }
      io.emit('receive_message', resMsg);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//server config
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});