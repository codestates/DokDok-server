const axios = require('axios');
const { User } = require('../../models');
const { generateAccessToken } = require('../../utils/userFunc');

const googleLogin = (req, res) => {
  /*

    로그인 버튼 
    https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:4000/users/google/callback&client_id=51151797715-vch07d409dgip3h7md7qvl9m5rqmor2j.apps.googleusercontent.com
*/
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`,
  );
};

const googleCallback = async (req, res) => {
  console.log(req.query.code);
  const code = req.query.code;

  try {
    const result = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSOWRD}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
    );

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`,
        },
      },
    );

    const [user, exist] = await User.findOrCreate({
      where: {
        email: userInfo.data.email,
        delflag: true,
        social_type: 'google',
      },
      defaults: {
        email: userInfo.data.email,
        nickname: userInfo.data.name,
        social_type: 'google',
        delflag: true,
        profile_image: userInfo.data.picture,
      },
    });

    const payload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      social_type: user.social_type,
      profile_image: user.profile_image,
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
    res.status(500).send({ message: '서버에러' });
  }
};

module.exports = {
  googleLogin,
  googleCallback,
};

/*
        userInfo.data.email = 'chotg5592@gmail.com',
        userInfo.data.name = '조태규
        userInfo.data.picture: 'https://lh3.googleusercontent.com/a/AATXAJwzy80606BpCX-IxeQOl13ZEVClutq-ywChdTp-=s96-c'
      */
