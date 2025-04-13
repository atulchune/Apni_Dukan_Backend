import { Router } from "express";
import AdminController from "../controllers/adminController"; 
import upload from "../middleware/upload";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.post("/upload_product",upload.array("files", 5),adminController.uploadProductData);


export default adminRoutes;