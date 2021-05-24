const { Post } = require("../../models");


module.exports = async (req, res) => {
    const { id, title, content, type, state, address, road_address } = req.body;
    const image = req.files;
    const path = image.map(img => img.location);

    // console.log(req.body);
    // console.log(req.user.id);
    
    if(req.user){
    try{
        await Post.update({
            title: title,
            content: content,
            type: type,
            state: state,
            address: address,
            road_address: road_address,
            image1: path[0] || null,
            image2: path[1] || null,
            image3: path[2] || null,
            image4: path[3] || null,
            image5: path[4] || null
        }, {
            where: { id: id }
        })
        const payload = {
            id: id,
            title: title,
            content: content,
            type: type,
            state: state,
            address: address,
            road_address: road_address,
            image1: path[0] || null,
            image2: path[1] || null,
            image3: path[2] || null,
            image4: path[3] || null,
            image5: path[4] || null
        }
        return res.status(200).json({
            post: payload,
            message: "Update post Success!"
        });
    }catch(err){
        if(!req.user){
            return res.status(401).json({ message: "액세스 토큰이 만료되었습니다." })
        }
    }
} else {
    return res.status(403).json({ "message": "수정할 권한이 없습니다." })
}
};