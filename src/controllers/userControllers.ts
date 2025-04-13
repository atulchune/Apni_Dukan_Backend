import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pool from "../db";
import bcrypt from "bcrypt";

class UserController {
  public async userRegister(req: Request, res: Response): Promise<void> {
    // try {
    //   const { name, email, password } = req.body;
    //   const hashedPassword: string = await bcrypt.hash(password, 10);
    //   const result = await pool.query(
    //     `insert into users (name, email,password) values ($1,$2,$3)`,
    //     [name, email, hashedPassword]
    //   );
    //   return res
    //     .status(200)
    //     .json({
    //       message: "User Registration Successfully",
    //       user: result.rows[0],
    //     });
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ error: (error as Error).message });
    // }
            //using prisma
    try {
        const {name,email,password} = req.body;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const result = await prisma.users.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
                isDeleted:false
            }
        })

        if(result){
            await prisma.$disconnect();
             res
            .status(200)
            .json({message:"user register successfully"})
            return
        }
    } catch (error) {
        console.error(error);
         res
        .status(500)
        .json({error:error})
        return
    }
  }

  public async userLogin(req: Request, res: Response): Promise<void> {
    try {
      
      console.log(await req.body)
      res.status(200)
      .json({message:"login successful"})
      return;
    } catch (error) {
      console.error(error);
      return
    }
    // try {
    //   const { email, password } = req.body;
    //   const user = await prisma.users.findFirst({
    //     where:{
    //       email:email
    // }})
    //   let userpassword;
    //   if (user?.email) {
    //     userpassword = user.password;
    //   } else {
    //      res.status(404).json({ message: "Please Check Your Email User not Found" });
    //      return;
    //   }
    //   if (await bcrypt.compare(password, userpassword)) {
    //       req.session.email = user.email;
    //       req.session.name = user.name;
    //       req.session.userid = user.id;
    //      res.status(200).json({ message: "User Login Successfully" });
    //      return ;
    //   } else {
    //      res.status(401).json({ message: "password is incorrect" });
    //      return;
    //   }
    // } catch (error) {
    //   console.error(error);
    //    res.status(500).json({ message: error });
    //    return;
    // }
  }
}

export default UserController;
