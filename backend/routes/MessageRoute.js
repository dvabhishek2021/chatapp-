import { Router } from "express";
import { getMessages, uploadFile } from "../controllers/MessageController.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";
import  multer  from "multer";

const messageRoute = Router();
const upload = multer({dest:"uploads/files"})
messageRoute.post("/getmessages",verifytoken,getMessages);
messageRoute.post("/upload-file",verifytoken,upload.single("file"),uploadFile);

export default messageRoute