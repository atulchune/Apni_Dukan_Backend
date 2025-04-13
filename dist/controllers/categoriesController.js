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
class CategoriesController {
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield prisma.category.findMany();
                if (data) {
                    res.status(200)
                        .json({ data: data });
                }
                else {
                    res.status(404)
                        .json({ message: "No Data Found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500)
                    .json({ message: error });
            }
        });
    }
    getProductByCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const category_name = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toLocaleString();
                console.log(category_name, 'category');
                const products = yield prisma.products.findMany({
                    include: {
                        Images: {
                            where: {
                                isDeleted: false,
                            },
                        },
                        category: true,
                    },
                    where: {
                        category: {
                            title: category_name, // Filter by category name
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
}
exports.default = CategoriesController;
