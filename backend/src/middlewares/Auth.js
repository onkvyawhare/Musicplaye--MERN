import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();



const auth=(req,res,next) => {
    try{
        //extract token
        const token=req.cookies.token 
        || req.body.token 
        || req.header("Authorisation").replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            });
        }

        //verify the token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }
        next();


    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'something went erong while validating the token',

        });

    }
}

export default auth;