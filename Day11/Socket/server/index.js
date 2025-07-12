const express = require('express');
const http = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT
const connectTODB = require('./services/db')
const User = require('./models/userModel')
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let counter = 0;

const getName = async()=>{
  try{
    const user = await User.find()
    console.log("user",user);
  }
  catch(err){
    console.log(err.message);
  }
}

getName()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('updateCounter', getName.name);

  socket.on('increment', () => {
    // counter++;
    io.emit('updateCounter', getName.name);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
connectTODB().then(()=>{
  server.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}`);
  });
})

