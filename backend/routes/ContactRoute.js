import { Router } from "express";
import { getContactForDM, Searchcontact } from "../controllers/Contactcontroller.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";
const contactRoute = Router();
contactRoute.post("/search",verifytoken,Searchcontact);
contactRoute.get("/getcontactsfordm",verifytoken,getContactForDM);
export default contactRoute