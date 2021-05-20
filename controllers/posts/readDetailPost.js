const { Post } = require("../../models");
module.exports = async (req, res) => {
    // 헤더 인증이 오면 user_id로 가져오는 형식(?)
    const { id } = req.params;
    console.log(req.params);
    try{
        await Post.findOne({ 
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
        return res.status(401).json({ "message": "실패" });
    }
};