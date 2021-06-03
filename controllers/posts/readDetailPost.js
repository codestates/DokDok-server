const { Post, User } = require("../../models");
module.exports = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params);
    // console.log(req.params.profile_image);

    try{
        await Post.findOne({ 
            include:[
                {
                    model: User,
                    attributes: ['nickname', 'profile_image']
                }
            ],
            where: {
                id: id
             } 
          })
          .then(data => {
            console.log("성공!!!");
            // console.log(data[0]);
            res.json({
                data,
                message: "게시글 상세 페이지 가져오기 성공!"
            });
        })
        // return res.status(200).json({ 
        //     id: postInfo.id,
        //      "message": "게시글 상세 페이지 가져오기 성공!" })
    }catch(err){
        return res.status(401).json({ message: "실패" });
    }
};