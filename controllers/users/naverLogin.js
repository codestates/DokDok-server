const axios = require('axios');
const { User } = require('../../models');
const { generateAccessToken } = require('../../utils/userFunc');

const naverLogin = (req, res) => {
  /*
    로그인 버튼
    https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Geic3o3F4WAETCidA5Yx&state=STATE_STRING&redirect_uri=http://localhost:4000/users/naver/callback
   */
  return res.redirect(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.NAVER_REDIRECT_URI}`,
  );
};

const naverCallback = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  try {
    const result = await axios.post(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
    );

    const userInfo = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });

    const [user, exist] = await User.findOrCreate({
      where: {
        email: userInfo.data.response.email,
        delflag: true,
        social_type: 'naver',
      },
      defaults: {
        email: userInfo.data.response.email,
        nickname: userInfo.data.response.nickname,
        social_type: 'naver',
        delflag: true,
        profile_image: userInfo.data.response.profile_image,
      },
    });

    const payload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      socialType: user.social_type,
      profileImage: user.profile_image,
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

    res.redirect(`http://localhost:3000/main?access_token=${accessToken}`);

    // res.status(200).send({
    //   accessToken: accessToken,
    //   user: payload,
    //   message: 'login success',
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '서버에러' });
  }
};

module.exports = {
  naverLogin,
  naverCallback,
};

/*
  userInfo.data.response;
    data: {
        resultcode: '00',
        message: 'success',
        response: {
                id: 'Ar0H7EQ2aWobm34ACwEM3IIO2bLJ_L37nD3OxVZLCvY',
                nickname: '사당동블루스',
                profile_image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
                email: 'thrillcho@naver.com',
                name: '조태규'
            }
    }
  */
