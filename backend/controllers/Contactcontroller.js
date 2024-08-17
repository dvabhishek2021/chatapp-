import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";

export const Searchcontact = async (req,res,next)=>{
    try{
        const {searchTerm} = req.body;
        if(searchTerm===undefined ||searchTerm===null){
            return res.status(400).send("search is required");
        }
        const sanitizeSearchTerm = searchTerm.replace(/[.*+?${}()|[\]\\]/g,
            "\\$&"
        );
        const regex = new RegExp(sanitizeSearchTerm,"i");
        const contact = await User.find({
            $and:[{_id:{$ne:req.userId}},
                {
                    $or: [{firstName:regex},{lastName:regex},{email:regex}],
                },
            ],
        });
        return res.status(200).json({contact});
        
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};



export const getContactForDM = async (req,res,next)=>{
    try{
        let {userId} = req;
        userId = new mongoose.Types.ObjectId(userId);
        const contacts = await Message.aggregate([
            {
                $match:{
                    $or:[{sender:userId},{recipient:userId}],
                },
            },
            {
                $sort:{ timestamp: -1 },
            },
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{$eq:["$sender",userId]},
                            then:"$recipient",
                            else:"$sender"
                        },
                    },
                    lastMessageTime:{$first: "$timestamp" },
                },
            },
            {
                $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"contactInfo",
            },
        },
        {
            $unwind:"$contactInfo",
        },
        {
            $project:{
                _id:1,
                lastMessageTime:1,
                email:"$contactInfo.email",
                firstName:"$contactInfo.firstName",
                lastName:"$contactInfo.lastName",
                
                color:"$contactInfo.color",
            },
        },
        {
            $sort:{
                lastMessageTime:-1
            },
        },
        ]);

        return res.status(200).json({contacts});
        
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};


export const getAllContacts = async (req,res,next)=>{
    try{
        const users = await User.find({_id:{ $ne: req.userId}},"firstName lastName _id email");
        const contacts = users.map((user)=>({
            label:user.firstName ? `${user.firstName} ${user.lastName} `: user.email,
            value: user._id,
        }));
        
        return res.status(200).json({contacts});
        
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};
