import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req,res,next)=>{
    try{
        const {name,members} = req.body;

        const userId = req.userId;

        const admin = await User.findById(userId);

        if(!admin){
            return res.status(400).send("Admin not found");
        }

        const validMembers = await User.find({ _id: {$in: members}});
        if(validMembers.length !== members.length){
            return res.status(400).send("Some members are Invalid members");
        }

        const newChannel = new Channel({
            name,members,admin: userId,
        });
        
        await newChannel.save();
        return res.status(201).json({ channel :newChannel})
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};

// code for getting all cahnnel

export const getUserChannels = async (req,res,next)=>{
    try{
        const userId = new mongoose.Types.ObjectId(req.userId);

        const channels = await Channel.find({
            $or: [{admin:userId},{members:userId}],
        }).sort({ updatedAt: -1 });

        

        
        
        return res.status(201).json({ channels })
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};


export const getChannelMessages = async (req,res,next)=>{
    try{
        const {channelId} = req.params;

        const channel = await Channel.findById(channelId).populate({path:"messages",populate:{
            path:'sender',select:"firstName lastName email _id color",
        }});

        if(!channel){
            return res.status(404).send("Channel not found");
        }
        const messages = channel.messages;

        

        
        
        return res.status(201).json({ messages });
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};

