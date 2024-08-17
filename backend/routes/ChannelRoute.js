import { Router } from "express";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";

const channelRoute = Router();
channelRoute.post("/create-channel",verifytoken,createChannel);
channelRoute.get("/get-user-channels",verifytoken,getUserChannels);
channelRoute.get("/get-channel-messages/:channelId",verifytoken,getChannelMessages);

export default channelRoute