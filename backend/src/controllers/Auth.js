import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();







//signup

const signup =async (req,res) => {

    try{
        //dta fetch from body
    const{
        name,
        email,
        password,
        confirmPassword
        

     }=req.body;

    //validation

    if(!name  || !email || !password || !confirmPassword  ){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        //2 password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password and confirm passworddo nt match please try again',
            })
        }

        //check user already exist or not
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user is already registerd'
            });
        }

        //find most recent otp stored for user
      

        

        //hash password

        const hashedPassword=await bcrypt.hash(password,10);
         
        
        //entry create
        const user=await userModel.create({
            name,
            email,
           
            password:hashedPassword,
           

        })
         return res.status(200).json({
            success:true,
            message:'user is registerd succesfully',
            user,
         })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "User cannot be registered. Please try again.",
          })
        

    }


        

}



//login

const login= async (req,res) => {
    try{
        //get data from req body

        const{email,password}=req.body;
        

        //validation dtat
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all fields are required please try again"
            })
        }

        //user check exist or not assword match
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registerd please signup first"
            })
        }

        
   //jwt token after password matching
   if(await bcrypt.compare(password,user.password)){
    const payload={
        email:user.email,
        id:user._id,
       
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h"
    });
    user.token=token;
    user.password=undefined;
   


 //create cookie and send response

        const options={
            expires:new Date(Date.now()+ 3*24*60*60*1000),
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
        })

    }
    else{
        return res.status(400).json({
            success:false,
            message:"password is incorrect"

        })
    }

}
    catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:'Login failure,please try again'
          });

    }
   
};

export{login,signup}


