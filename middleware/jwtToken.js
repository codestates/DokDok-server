require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization || req.cookies.Authorization;
  // console.log(req.headers.authorization);
  // console.log(req.cookies.Authorization);

  if (!authorization) {
    return res.status(401).send({ mesaage: 'Auth error' });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Auth error' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      console.error(error);
      return res.status(401).send({ message: error.name });
    } else {
      console.error(error);
      return res.status(401).send({ message: error.name });
    }
  }
};
