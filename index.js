const server = require('./socket');
require('dotenv').config();

const port = process.env.WEB_SOCKET_PORT;

server.listen(port, () => {
  console.log(`${process.env.WEB_SOCKET_PORT} 서버 실행`);
});
