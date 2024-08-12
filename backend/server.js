import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbconnect.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/AuthRoute.js";
import contactRoute from "./routes/ContactRoute.js";
import setupSocket from "./socket.js";
import messageRoute from "./routes/MessageRoute.js";

// import { verifytoken } from "./middleware/AuthMiddleware.js";



dotenv.config();
const app = express();
    // whenever the request from frontend to backend then it is parsed through backend
app.use(cors({
    origin:[process.env.ORIGIN],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

//middlewares


const port = 3000;

app.use("/api/auth",userRoute);
app.use("/api/contact",contactRoute);
app.use("/api/messages",messageRoute);


const server = app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})

setupSocket(server);























// chatapp12345