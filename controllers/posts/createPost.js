const { Post } = require("../../models");

module.exports = async (req, res) => {
    const { title, content, nickname, type, address, road_address, image1, image2, image3, image4, image5 } = req.body;
    const image = req.files;
    const path = image.map(img => img.path);

    console.log(req.body);
    console.log(req.user);
    console.log(req.files);
    console.log(req.files.length);
    console.log(path);

    if(req.user){
    try{
        // console.log("req.file: ", req.file.location);
        await Post.create({
            UserId: req.user.id,
            title: title,
            nickname: nickname,
            content: content,
            type: type,
            address: address,
            road_address: road_address,
            image1: req.files.length,
            image2: image2,
            image3: image3,
            image4: image4,
            image5: image5
        })
        .then(data => {
            console.log("성공!!!");
            // console.log(data[0]);
            return res.status(200).json({
                data,
                image,
                message: "게시글 생성 성공!" 
            });
        })
        // "post":{ "id": id, "title": title, "content": content},
    }catch(err){
        console.log("err :", err);
        return res.send({ message: "실패!" })
    } 
    } else {
        return res.status(401).json({ message: "액세스 토큰이 만료되었습니다."  })
    }
};