const { Post } = require("../../models");
module.exports = async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    console.log(req.user);

    if(req.user === id){
        try{
            const postInfo = await Post.findOne({
                where:{ id: id }
            })
            await postInfo.destroy({});
            return res.status(200).json({ message : "게시글 삭제 성공!" })
        }catch(err){
                return res.status(401).json({ message: "액세스 토큰이 만료되었습니다." })
        }
    } else {
        return res.status(403).json({ message: "삭제할 권한이 없습니다." })
    }
};