import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}[]
class adminController {
    public async uploadProductData(req: any, res: any): Promise<void> {
        try {
            const {
                ProductId,
                categoryId,
                ProductTypeId,
                name,
                productInto,
                Description,
                ProductPrice,
                DiscountPrice,
                Stock,
                ProductStatus,
                isDeleted,
            } = await req.body;

            console.log(categoryId, 'categoryId')
            const result = await prisma.products.upsert({

                where: {
                    ProductId: Number(ProductId),
                },
                update: {
                    ProductId: Number(ProductId),
                },
                create: {
                        categoryId: Number(categoryId),
                        ProductTypeId: Number(ProductTypeId),
                        name: name,
                        productInto: productInto,
                        Description: Description,
                        ProductPrice: Number(ProductPrice),
                        DiscountPrice: Number(DiscountPrice),
                        Stock: Number(Stock),
                        ProductStatus: ProductStatus,
                        isDeleted: Boolean(isDeleted),
                },
            }
            )
            if (result) {
                let uploadfiles: UploadedFile[] = req.files
                const transformedArray = uploadfiles.map(item => ({
                    "productId": result.ProductId,
                    "fileName": item.originalname,
                    "filePath": item.path,
                    "fileType": item.mimetype,
                    "fileSize": item.size,
                    "isDeleted": false,
                }));
                const uploadedfiles = await prisma.images.createMany({
                    data: transformedArray,
                    skipDuplicates: true,
                })
                res.status(201)
                    .json({ message: uploadedfiles })
                return;
            } else {
                res.status(404)
                    .json({ message: "something went wrong" })
                return
            }
        } catch (error) {
            console.log(error, "error")
            res.status(500)
                .json({ message: error });
            return
        }
    }
}

export default adminController
