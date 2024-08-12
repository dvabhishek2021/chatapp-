import express, { Router } from "express";
import { getUserData, login, logout, signup, updateprofile } from "../controllers/AuthController.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";
// const app = express();
// app.use(verifytoken);
const userRoute = Router();
userRoute.post("/signup",signup);
userRoute.post("/login",login);
userRoute.get("/userinfo",verifytoken,getUserData);
userRoute.post("/updateprofile",verifytoken,updateprofile);
userRoute.post("/logout",logout);


export default userRoute