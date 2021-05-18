module.exports = (req, res) => {
  if (req.headers.authorization) {
    delete req.headers.authorization;
  } else {
    res.clearCookie('authorization');
  }
  res.status(205).send({ message: 'logout success' });
};
