import { HOST } from "@/utils/constants.js";
import axios from "axios";




export const apiclient = axios.create({
    baseURL:HOST,
    // headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
})


