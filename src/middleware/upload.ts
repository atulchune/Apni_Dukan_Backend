import { Request, response, Response } from "express";
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req : any, file : any, cb:any) {
    cb(null, 'uploads/');
    },
    filename: function (req:any, file:any, cb:any) {
    cb(null, file.originalname);
    }
   });
const upload = multer({ storage: storage });

export default upload;