import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class OrdersController {
    public async createOrder(req: Request, res: Response): Promise<void> {
        const {
            orderNumber,
            stripeCheckoutSessionId,
            stripePaymentIntentId,
            stripeCustomerId,
            clerkUserId,
            customerName,
            email,
            invoice,
            products,
            currency,
            amountDiscount,
            totalPrice,
            status,
        } = req.body;
        console.log("orderNumber", orderNumber)
        try {
            let createdInvoice = null;
            if (invoice) {
                createdInvoice = await prisma.invoice.create({
                    data: {
                        invoiceId: invoice.invoiceId,
                        number: invoice.number,
                        hostedInvoiceUrl: invoice.hostedInvoiceUrl,
                    },
                });
            }

            const createdOrder = await prisma.order.create({
                data: {
                    orderNumber,
                    stripeCheckoutSessionId,
                    stripePaymentIntentId,
                    stripeCustomerId,
                    clerkUserId,
                    customerName,
                    email,
                    invoiceId: createdInvoice?.invoiceId ?? null,
                    currency,             
                    amountDiscount,                  
                    totalPrice,
                    status,             
                    products: {
                        create: products.map((p: any) => ({
                            productId: p.productId,
                            name: p.name,
                            price: p.price,
                            quantity: p.quantity,
                        })),
                    },
                },
            });

            res.status(200).json({ orderId: createdOrder.id });
        } catch (err) {
            console.error("Order creation failed:", err);
            res.status(500).json({ error: "Order creation failed" });
        }
    }


    public async getOrderDetail(req: Request, res: Response): Promise<void> {

        const  userId  = req.query.category?.toLocaleString();
        console.log("userId", userId)
        try {
            const order = await prisma.order.findMany({
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
              
            console.log(order,'products')
            if (order) {
                res
                    .status(200)
                    .json({ data: order })
            } else {
                res
                    .status(404)
                    .json({ data: "Data Not Found" })
            }
            return
        } catch (err) {
            console.error("Order creation failed:", err);
            res.status(500).json({ error: "Order creation failed" });
        }
    }

}

export default OrdersController
