require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization || req.cookies.authorization;

  if (!authorization) {
    return res.status(401).send({ mesaage: 'Auth error' });
  }

  const token = authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).send({ message: 'Auth error' });
  }
  req.user = decoded;
  next();
};
