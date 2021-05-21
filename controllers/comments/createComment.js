const { Comment } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.user.id);

    try{
        // let sql = `INSERT INTO comments (comment,created_at,updated_at, user_id, post_id) VALUES ('댓글',now(),now(),1, 1);`
        await Comment.create({          
                comment: comment,    // 댓글 내용
                PostId: id,          // 유저 고유 아이디 값
                UserId: req.user.id, // 게시글의 고유 아이디 값
          })
          .then(data => {
            console.log("성공!!!");
            res.status(200).json({
                data,
                message: "create comment success"
            });
        })
    }catch(err){
        console.log(err);
        return res.send({ message: "실패" });
    }
};