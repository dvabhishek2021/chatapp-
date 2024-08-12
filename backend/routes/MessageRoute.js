import { Router } from "express";
import { getMessages } from "../controllers/MessageController.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";

const messageRoute = Router();
messageRoute.post("/getmessages",verifytoken,getMessages);

export default messageRoute