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
class ProductController {
    fetchProductsBytypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productType } = req.body;
                console.log(productType, 'productType');
                const products = yield prisma.products.findMany({
                    include: {
                        Images: {
                            where: {
                                isDeleted: false, // Only include images where isDeleted is false
                            },
                        },
                    },
                    where: {
                        ProductTypeId: productType,
                        isDeleted: false,
                    },
                    orderBy: {
                        name: 'asc',
                    },
                });
                if (products) {
                    res
                        .status(200)
                        .json({ data: products });
                }
                else {
                    res
                        .status(404)
                        .json({ data: "Data Not Found" });
                }
                return;
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: error });
            }
        });
    }
    fetchProductsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.query;
                if (!Id) {
                    res.status(400)
                        .json({ error: "please pass proper query params" });
                    return;
                }
                const productId = Number(Id);
                const fetchProduct = yield prisma.products.findFirst({
                    include: {
                        category: {
                            select: {
                                title: true, // Equivalent to cat.title AS category
                            },
                        },
                        ProductType: {
                            select: {
                                Type: true, // Equivalent to prodtype."Type" AS productType
                            },
                        },
                        Images: true,
                    },
                    where: {
                        ProductId: productId,
                        isDeleted: false
                    },
                    orderBy: {
                        name: 'asc', // Equivalent to ORDER BY prod."name" ASC
                    },
                });
                if (!fetchProduct) {
                    res.status(404)
                        .json({ message: "Product Not Found" });
                    return;
                }
                else {
                    res.status(200)
                        .json({ message: fetchProduct });
                    return;
                }
            }
            catch (error) {
                res.status(500)
                    .json({ error: error });
                return;
            }
        });
    }
    fetchProductBySearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.query;
            if (!search) {
                res.status(400)
                    .json({ message: "please enter search param" });
                return;
            }
            try {
                const fetchProduct = yield prisma.products.findMany({
                    include: {
                        category: {
                            select: {
                                title: true,
                            },
                        },
                        ProductType: {
                            select: {
                                Type: true,
                            },
                        },
                        Images: true,
                    }, where: {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    orderBy: {
                        name: 'asc',
                    },
                });
                if ((fetchProduct === null || fetchProduct === void 0 ? void 0 : fetchProduct.length) <= 0) {
                    res.status(404)
                        .json({ message: "No Products found" });
                    return;
                }
                // const updated_fetch_product = await Promise.all(fetchProduct?.map((item,index)=>{
                // const NewImagesUrl = item?.imageUrl.split(';');
                // const updated_Values = {...item,
                //   category:item.category.title,
                //   ProductType:item.ProductType.Type,
                //   imageUrl:NewImagesUrl
                // }
                // return (
                //   updated_Values
                // )
                // }
                // )
                // )
                res.status(200)
                    .json({ message: fetchProduct });
                return;
            }
            catch (error) {
                console.error("error fetching products", error);
                res.status(500)
                    .json({ message: error });
                return;
            }
        });
    }
}
exports.default = ProductController;
