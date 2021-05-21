module.exports = (req, res) => {
  if (req.headers.authorization) {
    res.clearCookie('Authorization');
    res.status(205).send({ message: 'logout success' });
  } else {
  }
};
