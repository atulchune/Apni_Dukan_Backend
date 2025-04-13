import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CategoriesController {
    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const data = await prisma.category.findMany();
            if (data) {

                res.status(200)
                    .json({ data: data });
            } else {
                res.status(404)
                    .json({ message: "No Data Found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ message: error });
        }
    }
    public async getProductByCategories(req: Request, res: Response): Promise<void> {
        try {
            const  category_name  = req.query.category?.toLocaleString();
            console.log(category_name, 'category')
            const products = await prisma.products.findMany({
                include: {
                    Images: {
                        where: {
                            isDeleted: false, 
                        },
                    },
                    category: true,
                },
                where: {
                    category: {  // category is the relation field in the products model
                        title: category_name,  // Filter by category name
                      },
                    // category.title : category,
                    isDeleted: false,
                },
                orderBy: {
                    name: 'asc',
                },
            });
            if (products) {
                res
                    .status(200)
                    .json({ data: products })
            } else {
                res
                    .status(404)
                    .json({ data: "Data Not Found" })
            }
            return
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: error })
        }
    }
}

export default CategoriesController
