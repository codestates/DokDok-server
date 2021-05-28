const http = require('http');
const SocketIO = require('socket.io');
const app = require('./app');
const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`유저 조인`);
  socket.on('message', (message) => {
    console.log(message);
    io.emit('sendMessage', message);
  });
});

module.exports = server;
