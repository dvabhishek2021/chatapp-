import jwt from "jsonwebtoken";
export const verifytoken = (req,res,next)=>{
    console.log(req.cookies);
    const token = req.cookies.jwt;
    console.log({token});
    if(!token){
        return res.status(401).send("you are not authorized person");
    }
    jwt.verify(token,process.env.SERCRET_KEY,async(err,payload)=>{
        if(err) return res.status(403).send("token not valid");
        req.userId = payload.userId;
        next();
    });
    
};




// import jwt from "jsonwebtoken";

// //cretae a async arrow function

// export const verifytoken = async (req, res, next) => {
//     const token = req.token;
//     if(!token){
//         return res.json({success:false,message:"non authorized login again"});
//     }
//     try {
//         const tokendecode = jwt.verify(token,process.env.SERCRET_KEY);
//         req.userId = tokendecode;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"error"})
//     }
// };

// import jwt from 'jsonwebtoken';

// export const verifytoken = async (req, res, next) => {
//   try {
    
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.SERCRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please login first.' });
//   }
// };

// export default verifytoken;

