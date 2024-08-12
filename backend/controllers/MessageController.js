import Message from "../models/MessageModel.js";


export const getMessages = async (req,res,next)=>{
    try{
        const user1 = req.userId;
        const user2 = req.body.id;
        if(!user1 || !user2 ){
            return res.status(400).send("both userid is required");
        }
        
        
        const message = await Message.find({
            $or:[
                { sender:user1,recipient:user2 },
                { sender:user2,recipient:user1 },
            ],
        }).sort({ timestamp: 1 });
        
        return res.status(200).json({message});
        
       
    } catch (error) {
        console.log({error});
        res.status(500).send("server error");
    }
};