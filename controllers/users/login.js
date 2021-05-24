const { User } = require('../../models');
const {
  generateAccessToken,
  comparePassword,
} = require('../../utils/userFunc');
require('dotenv').config();

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOne({
      where: {
        email,
        delflag: true,
        social_type: 'local',
      },
    });

    if (!userInfo) {
      return res.status(403).send({ message: 'not exisit user' });
    }
    const result = comparePassword(password, userInfo.password);

    if (!result) {
      return res.status(401).send({ message: 'Invalid password' });
    }

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
      secure: true,
    });

    res.status(200).send({
      accessToken: accessToken,
      user: payload,
      message: 'login success',
    });
  } catch (error) {
    console.error(error);
  }
};
