const { sequelize } = require("../../models");

module.exports = async (req, res) => {
        try{
            let sql = `select * from posts;`

            await sequelize.query(sql)
            .then(data => {
                console.log("성공!!!");
                // console.log(data[0]);
                res.json({
                    data,
                    message: "게시글 검색 성공!"
                });
            })
        }catch(err){
            console.log('====');
            console.error(err);
            res.status(500).send('서버에러');
        }
};