import { Router } from "express";
import { getAllContacts, getContactForDM, Searchcontact } from "../controllers/Contactcontroller.js";
import { verifytoken } from "../middleware/AuthMiddleware.js";
const contactRoute = Router();
contactRoute.post("/search",verifytoken,Searchcontact);
contactRoute.get("/getcontactsfordm",verifytoken,getContactForDM);
contactRoute.get("/get-all-contacts",verifytoken,getAllContacts);
export default contactRoute