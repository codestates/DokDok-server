const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;

  try {
    const post = await Post.findOne({
      where: {
        id: postId,
      },
      attributes: ['id'],
    });
    if (!post) {
      return res.status(403).send({ message: '게시글이 존재하지 않습니다.' });
    }

    await post.addUsers(userId);
    res.status(200).send({ message: 'create intrest success' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버 에러' });
  }
};
