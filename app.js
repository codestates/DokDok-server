const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

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
      secure: true,
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
const inquireRouter = require('./routes/inquire');
const interestRouter = require('./routes/interest');

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/rooms', chattingRouter);
app.use('/chattings', chattingRouter);
app.use('/inquires', inquireRouter);
app.use('/interests', interestRouter);

app.listen(4000, () => {
  console.log('4000포트 서버 실행');
});
