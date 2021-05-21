const { Post } = require('../../models');

module.exports = async (req, res) => {
  const {
    title,
    content,
    nickname,
    type,
    address,
    road_address,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;
  console.log(req.body);
  console.log(req.user);

  if (req.user) {
    try {
      await Post.create({
        title: title,
        content: content,
        type: type,
        address: address,
        road_address: road_address,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        UserId: req.user.id,
      });
      return res.status(200).json({ message: '게시글 생성 성공!' });
      // "post":{ "id": id, "title": title, "content": content},
    } catch (err) {
      console.log('err :', err);
      return res.send({ message: '실패!' });
    }
  } else {
    return res.status(401).json({ message: '액세스 토큰이 만료되었습니다.' });
  }
};
