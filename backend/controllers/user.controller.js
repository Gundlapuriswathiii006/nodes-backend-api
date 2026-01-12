import User from "../Models/user.model.js";
const registerUser = async(req,res) => {
    try{
        const{username,email,password} = req.body;
        //basic validation
        if(!username||!password||!email){
            return res.status(400).json({message:"All fields are important"});
        }
        //check if user exists already
        const existing = await User.fineOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message:"user already exists"});

        }
        const User = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            
        });
        res.status(201).json({
            message:"user registered",
            User: {id:User.id,
                email:User.email,
                username:User.username}
        })
    }catch(error){
        res.status(500).json({message: "internal error",error:error.message});
}
};
const loginUser =  async(req,res) => {
    try {
        const {email,password} = req.body;
        const User = await User.fineOne({
            email:emailtoLowercase()

        });
        if(!User) return res .status(400).json({
            message:"user not founf!!!"
        });
        //compare passwords
        const isMatch = await User.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message:"invalid credentials"
        });
        res.status(200).json({
            message: "user logged in",
                user:{
                    id:User.id,
                    email:User.email,
                    username:User.username  
            }
        });
    } catch (error) {
        res.status(500).json({
            message:"backend error"
        
        });
    }
}

    const logoutUser = async(req,res) => {
            try{
                const {email} = req.body;
            const user = await User.findOne({
                email
            }); 
            if(!user) return res.status(404).json({
                message:"user not found"
            });
            res.status(200).json({
                message:"logout succesful"
            });
        }catch(error){
            res.status(500).json({
                message:"internal server error",error
            });
        }
    
    };


export{
    registerUser,
    loginUser,
    logoutUser

};  
