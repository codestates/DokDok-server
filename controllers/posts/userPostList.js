const { Post, User } = require("../../models");

module.exports = async (req, res) => {
    
        try{
            await Post.findAll({
                include:[
                    {
                        model: User,
                        attributes: ['nickname', 'profile_image']
                    }
                ],
                where: { UserId: req.user.id }
            })
            .then(result => {
                console.log("성공!!!");
                return res.json({
                    result,
                    message: "게시글 검색 성공!"
                });
            })
        }catch(err){
            console.log('====');
            console.error(err);
            res.status(500).send('서버에러');
        }
};