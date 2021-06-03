const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
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

    const postList = [];
    for (let i = 0; i < user.Posts.length; i++) {
      const id = user.Posts[i].id;
      const postInfo = await Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            attributes: ['nickname', 'profile_image'],
          },
        ],
      });
      postList.push(postInfo);
    }

    res.status(200).send(postList);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버에러' });
  }
};
