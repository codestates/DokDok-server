const { Post } = require("../../models");
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = async (req, res) => {
    const { title, nickname, address } = req.query;
    console.log(req.query.title);

        try{
            await Post.findAll({
                where:{ 
                  [Op.or]:[
                    {
                        title:{
                            [Op.like]: '%' + title + '%'
                        },
                    },
                    {
                        nickname:{
                            [Op.like]: '%' + nickname + '%'
                        },
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
            // return res.status(200).json({ 
            //     title: title,
            //     nickname: nickname,
            //     address: address,
            //     "message": "게시글 검색 성공!"
            // })
        }catch(err){
            console.log('====');
            console.error(err);
            res.status(500).send('서버에러');
        }
};