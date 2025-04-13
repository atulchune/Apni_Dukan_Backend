import { Router } from "express";
import UserController from "../controllers/userControllers";
import ProductController from "../controllers/productController";
import CategoriesController from '../controllers/categoriesController'
// import Authenticate from '../middleware/authenticate'
import ClerkAuthenticate from "../middleware/clerkAuthenticate";
import upload from "../middleware/upload";
import OrdersController from "../controllers/orderController";
const userRoutes = Router();
const userController = new UserController();
const productController = new ProductController();
const categoriesController = new CategoriesController();
const orderController = new OrdersController()
// const authenticate = new Authenticate();
const clerkauthenticate = new ClerkAuthenticate();

userRoutes.post("/signup",userController.userRegister);
userRoutes.use(clerkauthenticate.authenticate);
userRoutes.post("/login",userController.userLogin);
// userRoutes.use(authenticate.authenticate);
userRoutes.post("/products_by_product_type",upload.none(),productController.fetchProductsBytypes);
userRoutes.get("/productsId",productController.fetchProductsById);
userRoutes.get("/categories",categoriesController.getCategories);
userRoutes.get("/products_by_category",categoriesController.getProductByCategories);
userRoutes.get("/searchProducts",productController.fetchProductBySearch);
userRoutes.post("/createorder",orderController.createOrder);
userRoutes.get("/getorderdetail",orderController.getOrderDetail);
export default userRoutes;