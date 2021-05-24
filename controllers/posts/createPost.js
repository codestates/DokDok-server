const { Post, User } = require('../../models');

module.exports = async (req, res) => {
    const { title, content, type, address, road_address } = req.body;
    const image = req.files;
    const path = image.map(img => img.location);

    // console.log(req.body);
    // console.log(req.user);
    // console.log(req.files);
    // console.log(req.files.length);
    // console.log(image[0].location);
    // console.log(path);

    if(req.user){
    try{
        // console.log("req.file: ", req.file.location);
        const userInfo = await User.findOne({
            where:{
                id: req.user.id,
            },
            attributes:[
                'nickname', 'profile_image'
            ]
        }) 
        const payload = {
            nickname: userInfo.nickname,
            profileImage: userInfo.profile_image,
        }

        await Post.create({
                UserId: req.user.id,
                title: title,
                content: content,
                type: type,
                address: address,
                road_address: road_address,
                image1: path[0] || null,
                image2: path[1] || null,
                image3: path[2] || null,
                image4: path[3] || null,
                image5: path[4] || null
        })
        .then(data => {
            console.log("성공!!!");
            // console.log(userInfo);
            // console.log(data[0]);
            return res.status(200).json({
                user: payload,
                data,
                message: "게시글 생성 성공!"
            });
        })
        // "post":{ "id": id, "title": title, "content": content},
    }catch(err){
        console.log("err :", err);
        return res.send({ message: "실패!" })
    } 
    } else {
        return res.status(401).json({ message: "액세스 토큰이 만료되었습니다." })
    }
};
