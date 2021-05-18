require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password.toString(), 10);
  },
  comparePassword: (loginPassword, DbPassword) => {
    return bcrypt.compareSync(loginPassword, DbPassword);
  },
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  },
};
