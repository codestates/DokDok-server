const { User } = require('../../models');
const { hashPassword } = require('../../utils/userFunc');

module.exports = async (req, res) => {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).end();
  }

  try {
    const hashedPassword = hashPassword(password);
    const [user, exist] = await User.findOrCreate({
      where: {
        email,
        delflag: true,
        social_type: 'local',
      },
      defaults: {
        email,
        nickname,
        password: hashedPassword,
        social_type: 'local',
      },
    });

    if (!exist) {
      return res.status(409).send({ message: 'existing email' });
    }
    res.status(200).send({ message: 'signup success' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
