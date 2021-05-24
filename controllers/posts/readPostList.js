const { sequelize } = require("../../models");

module.exports = async (req, res) => {
        try{
            let sql = `select * from posts;`

            await sequelize.query(sql)
            .then(result => {
                console.log("성공!!!");
                console.log(result[0]);
                let posts = {};
                result[0].forEach(el => {
                    posts[el.id] = {
                        id : el.id,
                        title : el.title,
                        content : el.content,
                        interest_cnt : el.interest_cnt,
                        type : el.type,
                        state : el.state,
                        address : el.address,
                        road_address : el.road_address,
                        UserId: el.user_id,
                        image1: el.image1,
                        image2: el.image2,
                        image3: el.image3,
                        image4: el.image4,
                        image5: el.image5
                    }
                })
                res.json({
                    posts,
                    message: "게시글 검색 성공!"
                });
            })
        }catch(err){
            console.log('====');
            console.error(err);
            res.status(500).send('서버에러');
        }
};