
import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";
import Channel from "./models/ChannelModel.js";


const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();



    const disconnect = (socket) => {
        console.log(`client disconnect ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }

    };


    const sendMessage = async (message) => {
        const senderSocketid = userSocketMap.get(message.sender);
        const recipientSocketid = userSocketMap.get(message.recipient);

        const createMessage = await Message.create(message);
        console.log("hello");


        const msgData = await Message.findById(createMessage._id)
            .populate("sender", "id email firstName lastName color")
            .populate("recipient", "id email firstName lastName color");

        if (recipientSocketid) {
            io.to(recipientSocketid).emit("recieveMessage", msgData);
        }
        if (senderSocketid) {
            io.to(senderSocketid).emit("recieveMessage", msgData);
        }
    };

    const sendChannelMessage = async (message) => {
        const { channelId, content, sender, messageType, fileUrl } = message;
        const createdMessage = await Message.create({
            sender,
            recipient: null,
            content,
            messageType,
            timestamp: new Date(),
            fileUrl,
        });

        const messageData = await Message.findById(createdMessage._id).populate("sender", "id email firstName lastName color").exec();

        await Channel.findByIdAndUpdate(channelId, {
            $push: { messages: createdMessage._id },
        });

        const channel = await Channel.findById(channelId).populate("members");

        const finalData = { ...messageData._doc, channelId: channel._id };

        if (channel && channel.members) {
            channel.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    io.to(memberSocketId).emit("recieve-Channel-Message", finalData);
                }



            });
            const adminSocketId = userSocketMap.get(channel.admin._id.toString());
            if (adminSocketId) {
                io.to(adminSocketId).emit("recieve-Channel-Message", finalData);
            }
        }

    };


    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected ${userId} connected with socket ID ${socket.id}`)
        } else {
            console.log("user ID not provided");

        }
        socket.on("sendMessage", sendMessage);
        socket.on("send-channel-message", sendChannelMessage);
        socket.on("disconnect", () => disconnect(socket));


    });
};





export default setupSocket;