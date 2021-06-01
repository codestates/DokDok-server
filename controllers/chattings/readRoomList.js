const includes = require('lodash.includes');
const { User, Room } = require('../../models');

module.exports = async (req, res) => {
  console.log('read Room List');

  const myId = req.user.id;
  let data = [];

  /*
    roomid, = 룸 아이디
    opponentId
    opponentName = 상대방 닉네임
    opponentimg = 상대방 프사
    updatedAt = 마지막 채팅 시간
  */

  try {
    const myInfo = await User.findOne({
      where: {
        id: myId,
      },
      include: [
        {
          model: Room,
        },
      ],
    });
    // console.log(myInfo.id);
    // console.log(myInfo.Rooms);
    if (myInfo.Rooms.length !== 0) {
      for (let i = 0; i < myInfo.Rooms.length; i++) {
        if (myInfo.Rooms[i].delflag) {
          //   console.log(myInfo.Rooms[i].id);
          const RoomInfo = await Room.findOne({
            where: {
              id: myInfo.Rooms[i].id,
            },
            include: [{ model: User }],
          });
          //   console.log(RoomInfo.id);
          //   console.log(RoomInfo.Users);
          const opponentInfoList = RoomInfo.Users.filter(
            (user) => user.id !== myId,
          );
          //   console.log(opponentInfoList);
          opponentInfoList.forEach((opponentInfo) => {
            // console.log(opponentInfo);
            data.push({
              roomId: RoomInfo.id,
              opponentId: opponentInfo.id,
              opponentEmail: opponentInfo.email,
              opponentNicknam: opponentInfo.nickname,
              opponentProfileImg: opponentInfo.profile_image,
              opponentDelflag: opponentInfo.delflag,
            });
          });
        }
      }
      // 시간.....
      //   console.log(data);
      return res.status(200).send({ data, message: '성공' });
    } else {
      return res.status(200).send({ message: '채팅목록없음' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('에러');
  }
};
