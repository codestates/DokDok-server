const { Comment, User } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    // console.log(req.params);
    // console.log(req.body);
    console.log(req.user);

    try{
        const userInfo = await User.findOne({
            where:{
                id: req.user.id,
            },
            attributes:[
                'nickname'
            ]
        })

        const commentInfo = await Comment.findOne({
            where:{
                id: id
            }
        })

        await Comment.update({ 
            comment: comment,
        }, {
            where: { id: id }
        })

        const userload = {
            nickname: userInfo.nickname
        }

        const payload = {
            id: id,
            UserId: req.user.id,
            PostId: commentInfo.PostId,
            comment: comment,
        }
        
        console.log(commentInfo.PostId);
        return res.status(200).json({
            comment: payload,
            User: userload,
            message: "update comment success"
        });
        //   .then(data => {
        //     console.log("성공!!!");
        //     console.log(data[0]);
        //     res.status(200).json({
        //         // data,
        //         comment: payload,
        //         message: "update comment success"
        //     });
        // })
    }catch(err){
        console.log(err);
        return res.status(401).json({ message: "expired token" });
    }
};