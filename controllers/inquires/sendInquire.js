const { Inquire } = require("../../models");
module.exports = async (req, res) => {
    const { email, title, content } = req.body;

    try{
        await Inquire.create({
            email: email,
            title: title,
            content: content
        })  
        res.status(200).json({ message: "send inquiry success" })
    }catch(err){
        res.send({ message: "실패!"})
    }
};