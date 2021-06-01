const sequelize = require('sequelize');
const { Chatting, User } = require('../../models');

module.exports = async (req, res) => {
  const roomId = req.params.id;
  // const myId = req.user.id;
  // let opId;
  try {
    // const usersId = await Chatting.findAll({
    //   where: {
    //     RoomId: roomId,
    //   },
    //   attributes: [
    //     sequelize.fn('DISTINCT', sequelize.col('user_id')),
    //     'user_id',
    //   ],
    // });

    // for (let i = 0; i < usersId.length; i++) {
    //   if (usersId[i].dataValues.user_id !== req.user.id) {
    //     opId = usersId[i].dataValues.user_id;
    //   }
    // }

    const chattingData = await Chatting.findAll({
      where: {
        RoomId: roomId,
      },
      include: [
        {
          model: User,
          attributes: ['nickname', 'profile_image'],
        },
      ],
    });
    // console.log(chattingData);
    return res.status(200).send({ data: chattingData, message: '성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버에러' });
  }
};
