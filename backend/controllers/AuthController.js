

import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"
import { compare } from "bcrypt";

const maxTime = 3*24*60*60*1000;
const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.SERCRET_KEY);    //process.env.JWT_SECRET is the salt thst used to encrypt
};

export const signup = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("email and password required");
        }
        const user = await User.create({email,password});
        res.cookie("jwt",createToken(email,user.id),{
            maxTime,
            secure:true,
            sameSite:"None",
        });

        // const token = createToken(email,user.id)
        
        return res.status(201).json({user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                
            },
            
        });

    } catch (error) {
        console.log({error});
        return res.status(500).send("server error");
    }
};


export const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).send("email and password required");
        }
        let user = await User.findOne({email});
        if(!user){
            res.status(404).send("Invalid User!! please register"); 
        }
        const verifypass = await compare(password,user.password);
        if(!verifypass){
            res.status(400).send("Invalid password");
        }

        res.cookie("jwt",createToken(email,user.id),{
            maxTime,
            secure:true,
            sameSite:"None",
        });
        // const token = createToken(user.id)
        // res.json({success:true,token});
        // const token = createToken(email,user.id);

        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color,
                
            },
           
            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("server error");
    }
};

export const getUserData = async (req,res,next)=>{
    try {
        console.log(req.userId);
        const userdata = await User.findById(req.userId);
        if(!userdata){
            return res.status(404).send("user not exist");
        }
        

        return res.status(200).json({
            
            id:userdata.id,
            email:userdata.email,
            profileSetup:userdata.profileSetup,
            firstName:userdata.firstName,
            lastName:userdata.lastName,
            image:userdata.image,
            color:userdata.color,
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};


export const updateprofile = async (req,res,next)=>{
    try {
        const { userId } = req;
        const {firstName,lastName,color} = req.body;
        
        
        if(!firstName || !lastName){
            return res.status(400).send("firstname lastname and color is required");
        }
        const userdata = await User.findByIdAndUpdate(userId,{
            firstName,lastName,color,profileSetup:true,
        },{new:true, runValidators:true});

        return res.status(200).json({
            
            id:userdata.id,
            email:userdata.email,
            profileSetup:userdata.profileSetup,
            firstName:userdata.firstName,
            lastName:userdata.lastName,
            image:userdata.image,
            color:userdata.color,
            
        });
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};


export const logout = async (req,res,next)=>{
    try{
        res.cookie("jwt","",{maxTime:1});
        return res.status(200).json({message:"logged out successfull"});
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};





// module.exports = signup;
// module.exports = login;
// module.exports = getUserData;
