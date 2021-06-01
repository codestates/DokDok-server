const http = require('http');
const SocketIO = require('socket.io');
const app = require('./app');
const { Chatting } = require('./models');
const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`소켓연결`);

  socket.on('join', ({ roomId: room, userinfo }) => {
    socket.join(room);
    io.to(room).emit('onConnect', {
      id: -1,
      content: `${userinfo.nickname} 님이 입장했습니다.`,
    });
    socket.on('onSend', async (content) => {
      console.log(content);
      io.to(room).emit('onReceive', { ...userinfo, content });
      // 여기에 채팅 디비 저장하는거 넣고
      try {
        const chattingInfo = await Chatting.create({
          UserId: userinfo.id,
          RoomId: room,
          content: content,
        });
        // console.log('db에 넣음');
        // console.log(chattingInfo);
      } catch (error) {
        console.error(error);
      }
    });
    socket.on('disconnect', () => {
      socket.leave(room);
      io.to(room).emit('onDisconnect', {
        id: -1,
        content: `${userinfo.nickname} 님이 퇴장하셨습니다.`,
      });
    });
  });
});

module.exports = server;
