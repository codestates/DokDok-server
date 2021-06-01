const server = require('./socket');
require('dotenv').config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`${process.env.PORT} 서버 실행`);
});
