const { Comment, User } = require("../../models");

module.exports = async (req, res) => {
    // 헤더 인증이 오면 user_id로 가져오는 형식(?)
    const { id } = req.params;
    console.log(req.params);
    try{
        // let sql = `SELECT id, comment, created_at AS createdAt, updated_at AS updatedAt, user_id AS UserId, post_id AS PostId FROM comments AS Comment WHERE Comment.post_id =?;`
        await Comment.findAll({ 
            include:[
                {
                    model: User,
                    attributes: ['nickname']
                }
            ],
            where: {
                PostId: id
             } 
          })
          .then(data => {
            console.log("성공!!!");
            res.json({
                data,
                message: "read comments success"
            });
        })
    }catch(err){
        return res.send({ message: "실패" });
    }
};