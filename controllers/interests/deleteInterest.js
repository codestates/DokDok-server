const { User, Post } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;

  // 관심 추가가 안되어있는데 삭제하려고하면 막는 쿼리 추가하면 더 완성도있음

  if (userId && postId) {
    try {
      const postInfo = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!postInfo) {
        return res.status(403).send({ message: '게시물이 존재하지 않습니다.' });
      }

      const isInterest = await postInfo.hasUsers(userId);
      if (isInterest) {
        await postInfo.removeUsers(userId);
        if (postInfo.interest_cnt > 0) {
          postInfo.interest_cnt = postInfo.interest_cnt - 1;
          await postInfo.save();
          return res.status(200).send({ message: 'delete interest success' });
        } else {
          res.status(400).send({ message: '관심은 음수로 떨어질수 없습니다.' });
        }
      }
      res
        .status(400)
        .send({ message: '관심 등록이 안되있어서 관심삭제를 할수 없습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: '서버 에러' });
    }
  }
};
