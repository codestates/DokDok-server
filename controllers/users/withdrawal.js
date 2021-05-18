const { User } = require('../../models');

module.exports = async (req, res) => {
  if (req.user) {
    try {
      const withdrawalUser = await User.update(
        {
          delflag: false,
        },
        {
          where: {
            email: req.user.email,
            id: req.user.id,
          },
        },
      );

      if (withdrawalUser) {
        if (req.headers.authorization) {
          delete req.headers.authorization;
          res.clearCookie('authorization');
        } else {
          res.clearCookie('authorization');
        }
        res.status(201).send({ message: 'withdrawal success' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  } else {
    res.status(401).send({ message: 'not exisit user' });
  }
};
