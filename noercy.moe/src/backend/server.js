const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
//const messages = [];
const messagesFilePath = path.join(__dirname, 'chatHistory.json');

const readMessagesFromJSON = () => {
  const data = fs.readFileSync(messagesFilePath, 'utf-8');
  return JSON.parse(data);
}

const writeMessagesToJSON = (messages) => {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

let messages = readMessagesFromJSON();

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('previousMessages', messages);

    socket.on('chatMessage', (msg) => {

        const message = {
            ...msg,
            timeStamp: Date.now()
        };


        messages.push(msg);
        writeMessagesToJSON(messages)
        console.log("new message", msg)
        io.emit('chatMessage', msg); // Broadcast the new message to all connected clients
      });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(8080, () => {
    console.log(`Server is running on port 8080`)
})