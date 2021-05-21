const { Comment } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(req.params);
    console.log(req.body);
    console.log(req.user);

    try{
        await Comment.update({ 
            comment: comment,
        }, {
            where: { id: id }
        })
          .then(data => {
            console.log("성공!!!");
            console.log(data[0]);
            res.status(200).json({
                data,
                message: "update comment success"
            });
        })
    }catch(err){
        return res.status(401).json({ message: "expired token" });
    }
};