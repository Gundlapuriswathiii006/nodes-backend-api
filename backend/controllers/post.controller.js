import { Post } from "../Models/post.model.js";
const createPost = async(req,res) => {
    try {
        const {name,description,age} = req.body;
        if(!name ||!description||!age){
            return res.status(500).json({
                message:"all fields are required"

            });
            const  Post = await Post.create({name,description,age});
                res.status(201).json({
                    message:"post created succesfully"
                });
        }
        
    } catch (error) {
        res.status(500).json({
            message:"internal error"
        });
        
    }
}
export{
    createPost
};