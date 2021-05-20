const { Post } = require("../../models");


module.exports = async (req, res) => {
    const { id, title, content, type, state, address, road_address, image1, image2, image3, image4, image5 } = req.body;
    console.log(req.body);
    console.log(req.user.id);
    
    if(req.user === id){
    try{
        await Post.update({
            title: title,
            content: content,
            type: type,
            state: state,
            address: address,
            road_address: road_address,
            image1: image1,
            image2: image2,
            image3: image3,
            image4: image4,
            image5: image5
        }, {
            where: { id: id }
        })
        return res.status(200).json({ "message": "Update post Success!" })
        // "post":{ "id": id, "title": title, "content": content},
    }catch(err){
        if(!req.user){
            return res.status(401).json({ "message": "액세스 토큰이 만료되었습니다." })
        }
    }
} else {
    return res.status(403).json({ "message": "수정할 권한이 없습니다." })
}
};