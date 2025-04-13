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
class OrdersController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { orderNumber, stripeCheckoutSessionId, stripePaymentIntentId, stripeCustomerId, clerkUserId, customerName, email, invoice, products, currency, amountDiscount, totalPrice, status, } = req.body;
            console.log("orderNumber", orderNumber);
            try {
                let createdInvoice = null;
                if (invoice) {
                    createdInvoice = yield prisma.invoice.create({
                        data: {
                            invoiceId: invoice.invoiceId,
                            number: invoice.number,
                            hostedInvoiceUrl: invoice.hostedInvoiceUrl,
                        },
                    });
                }
                const createdOrder = yield prisma.order.create({
                    data: {
                        orderNumber,
                        stripeCheckoutSessionId,
                        stripePaymentIntentId,
                        stripeCustomerId,
                        clerkUserId,
                        customerName,
                        email,
                        invoiceId: (_a = createdInvoice === null || createdInvoice === void 0 ? void 0 : createdInvoice.invoiceId) !== null && _a !== void 0 ? _a : null,
                        currency,
                        amountDiscount,
                        totalPrice,
                        status,
                        products: {
                            create: products.map((p) => ({
                                productId: p.productId,
                                name: p.name,
                                price: p.price,
                                quantity: p.quantity,
                            })),
                        },
                    },
                });
                res.status(200).json({ orderId: createdOrder.id });
            }
            catch (err) {
                console.error("Order creation failed:", err);
                res.status(500).json({ error: "Order creation failed" });
            }
        });
    }
    getOrderDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toLocaleString();
            console.log("userId", userId);
            try {
                const order = yield prisma.order.findMany({
                    include: {
                        products: {
                            include: {
                                product: {
                                    include: {
                                        Images: {
                                            where: {
                                                isDeleted: false, // Only include images that are not deleted
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        invoice: true,
                    },
                    where: {
                        clerkUserId: userId,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                console.log(order, 'products');
                if (order) {
                    res
                        .status(200)
                        .json({ data: order });
                }
                else {
                    res
                        .status(404)
                        .json({ data: "Data Not Found" });
                }
                return;
            }
            catch (err) {
                console.error("Order creation failed:", err);
                res.status(500).json({ error: "Order creation failed" });
            }
        });
    }
}
exports.default = OrdersController;
