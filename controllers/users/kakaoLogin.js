const axios = require('axios');
const { User } = require('../../models');
const { generateAccessToken } = require('../../utils/userFunc');

const kakaoLogin = async (req, res) => {
  console.log('ddddd');
  // 로그인 버튼
  // https://kauth.kakao.com/oauth/authorize?client_id=da648601d0e0a69540e05282cb994f18&redirect_uri=http://localhost:4000/users/kakao/callback&response_type=code
  return res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`,
  );
  // const result = await axios.get(
  //   `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`,
  // );
};

const kakaoCallback = async (req, res) => {
  const code = req.query.code;
  try {
    const result = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
    );
    const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });

    const [user, exist] = await User.findOrCreate({
      where: {
        email: userInfo.data.kakao_account.email,
        delflag: true,
        social_type: 'kakao',
      },
      defaults: {
        email: userInfo.data.kakao_account.email,
        nickname: userInfo.data.kakao_account.profile.nickname,
        social_type: 'kakao',
        delflag: true,
        profile_image: userInfo.data.kakao_account.profile.is_default_image
          ? null
          : userInfo.data.kakao_account.profile.profile_image_url,
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
      secure: true, // https
    });

    res.redirect(`http://localhost:3000/main?access_token=${accessToken}`);
    // res.status(200).send({
    //   accessToken: accessToken,
    //   user: payload,
    //   message: 'login success',
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버에러' });
  }
};

const kakaoUserinfo = (req, res) => {
  console.log(req.user);
  res.status(200).send(req.user);
};

module.exports = {
  kakaoLogin,
  kakaoCallback,
  kakaoUserinfo,
};

/*
            프사가 없으면 is_default_image : true
            userInfo.data
            userInfo.data.kakao_account.profile.nickname
            userInfo.data.kakao_account.profile.is_default_image // 기본프사여부
            userInfo.data.kakao_account.email


            프사가 있으면
            userInfo.data.kakao_account.profile.
            thumbnail_image_url: 'http://k.kakaocdn.net/dn/zL8IK/btq5hZaEJ4i/DM7npqNkMi4Txohs2l5k31/img_110x110.jpg',
            profile_image_url: 'http://k.kakaocdn.net/dn/zL8IK/btq5hZaEJ4i/DM7npqNkMi4Txohs2l5k31/img_640x640.jpg',
      */
