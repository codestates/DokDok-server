const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const db = require('./models');
require('dotenv').config();
const axios = require('axios');
const server = http.createServer(app);

const socketIO = require('socket.io');

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("연결이 이루어 졌습니다.");
})


db.sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: process.env.DOMAIN,
      path: '/',
      sameSite: 'none',
      httpOnly: true,
      secure: false,
    },
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const chattingRouter = require('./routes/chatting');
const roomsRouter = require('./routes/rooms');
const inquireRouter = require('./routes/inquire');
const interestRouter = require('./routes/interest');

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/rooms', roomsRouter);
app.use('/chattings', chattingRouter);
app.use('/inquires', inquireRouter);
app.use('/interests', interestRouter);

server.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 서버 실행`);
});
