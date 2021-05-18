const { User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: {
        email: req.user.email,
        delflag: true,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (userInfo) {
      return res.status(200).send({
        user: {
          id: userInfo.id,
          email: userInfo.email,
          nickname: userInfo.nickname,
          socialType: userInfo.social_type,
          profileImage: userInfo.profile_image,
          delflag: userInfo.delflag,
        },
        message: 'userinfo success',
      });
    } else {
      return res.status(400).send({ message: '존재하지 않는 회원입니다.' });
    }
  } catch (error) {
    console.log('====');
    console.error(error);
    res.status(500).send('서버에러');
  }
};
