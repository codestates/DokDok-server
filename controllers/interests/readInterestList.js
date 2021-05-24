const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;

  try {
    const [user, prevUser] = await User.findAll({
      where: {
        id: userId,
      },
      include: [
        {
          model: Post,
        },
      ],
    });
    // console.log(user[0].dataValues.Posts[0]);
    // console.log(user[0].dataValues.Posts[1]);
    console.log(user.Posts);
    res.status(200).send(user.Posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버에러' });
  }
};
