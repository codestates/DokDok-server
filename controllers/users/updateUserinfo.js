const { User } = require('../../models');
require('dotenv').config();
const { hashPassword, generateAccessToken } = require('../../utils/userFunc');

module.exports = async (req, res) => {
  const { nickname, password, profileImage } = req.body;
  console.log(req.file);
  console.log(nickname, password, profileImage);

  if (!nickname && !password && !profileImage) {
    return res.status(400).end();
  }

  try {
    const userInfo = await User.findOne({
      where: {
        email: req.user.email,
        delflag: true,
      },
    });

    if (nickname) {
      userInfo.nickname = nickname;
    }

    if (password) {
      userInfo.password = hashPassword(password);
    }

    if (req.file.location) {
      userInfo.profile_image = req.file.location;
      console.log('asdfasdf');
    }

    await userInfo.save();

    const payload = {
      id: userInfo.id,
      email: userInfo.email,
      nickname: userInfo.nickname,
      socialType: userInfo.social_type,
      profileImage: userInfo.profile_image,
    };

    const accessToken = generateAccessToken(payload);

    res.cookie('Authorization', `Bearer ${accessToken}`, {
      domain: process.env.DOMAIN,
      path: '/',
      maxAge: 24 * 6 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
      secure: false, // https
    });
    console.log(userInfo.profile_image);
    return res.status(200).send({
      accessToken,
      user: payload,
      message: 'userinfo update success.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
