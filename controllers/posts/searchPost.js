const { Post, User } = require("../../models");
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = async (req, res) => {
    const { title, address, nickname } = req.query;
    console.log(req.query.title);

    
        try{
            let userInfo;
            
            if(nickname){
                userInfo = await User.findOne({
                    where:{
                        nickname: nickname
                    },
                })
                console.log(userInfo);
            }
            
            await Post.findAll({
                include: [{
                    model: User,
                    attributes:['nickname'],
                }],
                where:{ 
                  [Op.or]:[
                    {
                        title:{
                            [Op.like]: '%' + title + '%'
                        },
                    },
                    {
                        UserId: userInfo.id,
                    },
                    {
                        address: {
                            [Op.like]: '%' + address + '%'
                        }
                    }
                ]
            }
            })
            .then(data => {
                console.log("성공!!!");
                // console.log(data[0]);
                res.json({
                    data,
                    message: "게시글 검색 성공!"
                });
            })
        }catch(err){
            console.log('====');
            console.error(err);
            res.status(500).send('서버에러');
        }
};