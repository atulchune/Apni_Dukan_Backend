import { NextFunction, Request, Response } from "express";
import{requireAuth } from '@clerk/express'

class ClerkAuthenticate {
    public async authenticate(req:Request,res:Response, next:NextFunction):Promise<void>{
        if(!requireAuth()){
            const err = new Error("You are not Authorize");
            res.status(401);
            next(err.message = "you are not authorize");
          }
          next();
    }
}

export default  ClerkAuthenticate;