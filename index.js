const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  chatID = socket.handshake.query.chatID
    socket.join(chatID)

    // console.log(socket.handshake, "chatID");


  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);

    
  });

  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);

  //   console.log(data, "senddata");
  // });


  socket.on('send_message', message => {
    receiverChatID = message.receiverChatID
    senderName = message.author,
    senderChatID = message.senderChatID
    content = message.message
console.log(message,"messae detail");
    //Send message to only that particular room
    socket.in(receiverChatID).emit('receive_message', {
        'content': content,
        'senderChatID': senderChatID,
        'receiverChatID':receiverChatID,
        "senderName": senderName,
    })
})

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
