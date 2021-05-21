const { Comment } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    console.log(req.user);

    if(req.user){
        try{
            const commentInfo = await Comment.findOne({
                where:{ id: id }
            })
            await commentInfo.destroy({});
            return res.status(200).json({ message : "delete comment success" })
        }catch(err){
                return res.status(401).json({ message: "expired token" })
        }
    } else {
        return res.status(403).json({ message: "삭제할 권한이 없습니다." })
    }
};