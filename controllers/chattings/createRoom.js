const { Room, User } = require('../../models');
const _ = require('lodash');
module.exports = async (req, res) => {
  console.log('createRoom');
  console.log(req.user.id); // 로그인한 유저의 아이디
  console.log(req.body.opponentId); // 게시글 작성자의 아이디
  const myId = req.user.id;
  const opponentId = req.body.opponentId;

  // 유저가 게시글작성자랑 채팅방이 있는지 조회
  // 없으면 create 해준뒤 채팅방으로 보냄
  // 있으면 create 하지 않고 그냥 작성자랑 채팅방으로 보내버림

  try {
    const myInfo = await User.findOne({
      where: {
        id: myId,
      },
      attributes: ['id'],
      include: [
        {
          model: Room,
        },
      ],
    });
    // console.log(myInfo.Rooms);

    const opponentInfo = await User.findOne({
      where: {
        id: opponentId,
      },
      attributes: ['id'],
      include: [
        {
          model: Room,
        },
      ],
    });
    // console.log(opponentInfo.Rooms);

    const myRoomList = [];
    const opponentList = [];
    for (let i = 0; i < myInfo.Rooms.length; i++) {
      myRoomList.push(myInfo.Rooms[i].id);
    }

    for (let i = 0; i < opponentInfo.Rooms.length; i++) {
      opponentList.push(opponentInfo.Rooms[i].id);
    }

    const isRoom = _.intersection(myRoomList, opponentList);
    console.log(isRoom);

    if (isRoom.length === 0) {
      const roomInfo = await Room.create({
        deflag: true,
      });
      console.log(roomInfo);
      await roomInfo.addUsers(myId);
      await roomInfo.addUsers(opponentId);

      /*
        방이 만들어짐 -> 만들어진 방으로 보냄 -> 채팅내용을 요청 (필요한 것: room_id를 알면 그 룸아이디가 있는 채팅 모두 가져올수 있음 룸아이디 보내주면될듯 룸아디랑 내아뒤 상대방 아뒤보내주면될듯)
      */
      return res.status(200).send({
        data: {
          roomId: roomInfo.id,
          myId,
          opponentId,
        },
        message: 'create room success',
      });
    } else if (isRoom.length === 1) {
      return res.status(200).send({
        data: {
          roomId: isRoom[0],
          myId,
          opponentId,
        },
        message: 'create room success',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
