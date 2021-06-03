const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;

  // 이미 관심추가했으면 또 추가 못하게 막는 쿼리 추가하면 더 완성도 있어짐

  if (userId && postId) {
    try {
      const postInfo = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!postInfo) {
        return res.status(403).send({ message: '게시글이 존재하지 않습니다.' });
      }

      const isInterest = await postInfo.hasUsers(userId);
      if (!isInterest) {
        await postInfo.addUsers(userId);
        postInfo.interest_cnt = postInfo.interest_cnt + 1;
        await postInfo.save();
        return res.status(200).send({ message: 'create intrest success' });
      }

      res.status(400).send({ message: '이미 관심 등록 했습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: '서버 에러' });
    }
  } else {
    res.status(400).send({ message: '회원 또는 포스트아이디 X' });
  }
};
