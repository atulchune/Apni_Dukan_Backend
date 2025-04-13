// import { NextFunction, Request, Response } from "express";

// class Authenticate {
//     public async authenticate(req:Request,res:Response, next:NextFunction):Promise<void>{
//         if(!req.session || !req.session.userid){
//             const err = new Error("You are not Authorize");
//             res.status(401);
//             next(err.message = "you are not authorize")
//           }
//           next();
//     }
// }

// export default  Authenticate;