const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  console.log(userId, postId);

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
    const result = await post.hasUsers(userId);
    res
      .status(200)
      .send({ interest: result, message: 'get interest state success' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버 에러' });
  }
};
