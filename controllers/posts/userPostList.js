const { sequelize } = require("../../models");

module.exports = async (req, res) => {
console.log(req.user);
    if(req.user){
        try{
            let sql = `select * from posts;`

            await sequelize.query(sql)
            .then(data => {
                console.log("성공!!!");
                res.json({
                    data,
                    message: "게시 목록 가져오기 성공!"
                });
            })
        }catch(err){
            return res.send({ message: "실패"})
        }
    } else {
        return res.status(401).json({ message: "액세스 토큰이 만료되었습니다." })
    }
};