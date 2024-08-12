import mongoose from "mongoose";


export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://dvabhishek2:chatapp12345@chat.kif6jh2.mongodb.net/CHATAPPBASE');
        console.log("database connected");
    } catch (error) {
        console.log("MongoDB fail");
    }
}




