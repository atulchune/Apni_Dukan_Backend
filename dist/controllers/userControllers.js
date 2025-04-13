"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const result = yield prisma.users.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        isDeleted: false
                    }
                });
                if (result) {
                    yield prisma.$disconnect();
                    res
                        .status(200)
                        .json({ message: "user register successfully" });
                    return;
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: error });
                return;
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(yield req.body);
                res.status(200)
                    .json({ message: "login successful" });
                return;
            }
            catch (error) {
                console.error(error);
                return;
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
        });
    }
}
exports.default = UserController;
