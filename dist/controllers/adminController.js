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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
[];
class adminController {
    uploadProductData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ProductId, categoryId, ProductTypeId, name, productInto, Description, ProductPrice, DiscountPrice, Stock, ProductStatus, isDeleted, } = yield req.body;
                console.log(categoryId, 'categoryId');
                const result = yield prisma.products.upsert({
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
                });
                if (result) {
                    let uploadfiles = req.files;
                    const transformedArray = uploadfiles.map(item => ({
                        "productId": result.ProductId,
                        "fileName": item.originalname,
                        "filePath": item.path,
                        "fileType": item.mimetype,
                        "fileSize": item.size,
                        "isDeleted": false,
                    }));
                    const uploadedfiles = yield prisma.images.createMany({
                        data: transformedArray,
                        skipDuplicates: true,
                    });
                    res.status(201)
                        .json({ message: uploadedfiles });
                    return;
                }
                else {
                    res.status(404)
                        .json({ message: "something went wrong" });
                    return;
                }
            }
            catch (error) {
                console.log(error, "error");
                res.status(500)
                    .json({ message: error });
                return;
            }
        });
    }
}
exports.default = adminController;
