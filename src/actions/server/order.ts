"use server"

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import { sendOrderInvoiceEmail } from "@/lib/orderInvoice";
import { simulatePayment, type PaymentMethod, type PaymentStatus } from "@/lib/payment";

export type ShippingInfo = {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      notes?: string;
};

export type PaymentInput = {
      method: PaymentMethod;
      last4?: string;
};

type OrderItemRecord = {
      productId: ObjectId;
      name: string;
      image: string;
      price: number;
      quantity: number;
};

type OrderRecord = {
      _id: ObjectId;
      userId: ObjectId;
      items: OrderItemRecord[];
      subtotal: number;
      total: number;
      shippingInfo: ShippingInfo;
      status: string;
      paymentMethod?: PaymentMethod;
      paymentStatus?: PaymentStatus;
      transactionId?: string;
      cardLast4?: string;
      createdAt: Date;
      updatedAt: Date;
};

const normalizeOrder = (order: OrderRecord) => ({
      _id: order._id.toString(),
      items: order.items.map((item) => ({
            productId: item.productId.toString(),
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
      })),
      subtotal: order.subtotal,
      total: order.total,
      shippingInfo: order.shippingInfo,
      status: order.status,
      paymentMethod: order.paymentMethod ?? "cod",
      paymentStatus: order.paymentStatus ?? "unpaid",
      transactionId: order.transactionId,
      cardLast4: order.cardLast4,
      createdAt: order.createdAt,
});

export const createOrder = async (shippingInfo: ShippingInfo, payment: PaymentInput) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user) {
            throw new Error("User not authenticated");
      }

      if (!ObjectId.isValid(user.id)) {
            throw new Error("Invalid user ID");
      }

      if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
            throw new Error("Missing required shipping details");
      }

      if (payment.method !== "cod" && payment.method !== "card") {
            throw new Error("Invalid payment method");
      }

      if (payment.method === "card" && !/^\d{4}$/.test(payment.last4 ?? "")) {
            throw new Error("Invalid card details");
      }

      const paymentResult = simulatePayment(payment);

      if (!paymentResult.approved) {
            throw new Error("Payment was declined. Please try a different card or choose cash on delivery.");
      }

      try {
            const cartItems = await getCollection("CART").find({ userId: new ObjectId(user.id) }).toArray();

            if (cartItems.length === 0) {
                  throw new Error("Cart is empty");
            }

            const items = cartItems.map((item) => ({
                  productId: item.productId,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  quantity: item.quantity,
            }));

            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const order = {
                  userId: new ObjectId(user.id),
                  items,
                  subtotal,
                  total: subtotal,
                  shippingInfo,
                  status: "pending",
                  paymentMethod: payment.method,
                  paymentStatus: paymentResult.status,
                  transactionId: paymentResult.transactionId,
                  cardLast4: payment.method === "card" ? payment.last4 : undefined,
                  createdAt: new Date(),
                  updatedAt: new Date(),
            };

            const result = await getCollection("ORDERS").insertOne(order);
            await getCollection("CART").deleteMany({ userId: new ObjectId(user.id) });

            if (user.email) {
                  try {
                        await sendOrderInvoiceEmail(
                              {
                                    _id: result.insertedId.toString(),
                                    items: order.items,
                                    subtotal: order.subtotal,
                                    total: order.total,
                                    shippingInfo: order.shippingInfo,
                                    status: order.status,
                                    paymentMethod: order.paymentMethod,
                                    paymentStatus: order.paymentStatus,
                                    transactionId: order.transactionId,
                                    createdAt: order.createdAt,
                              },
                              user.email,
                              user.name || shippingInfo.fullName
                        );
                  } catch (error) {
                        console.error("Failed to send order invoice email:", error);
                  }
            }

            return { status: "success", orderId: result.insertedId.toString() };
      } catch (error) {
            console.error("Error creating order:", error);
            throw error instanceof Error && error.message === "Cart is empty" ? error : new Error("Failed to create order");
      }
}

export const getOrderById = async (orderId: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user) {
            throw new Error("User not authenticated");
      }

      if (!ObjectId.isValid(orderId)) {
            throw new Error("Invalid order ID");
      }

      const order = await getCollection("ORDERS").findOne({ _id: new ObjectId(orderId) });

      if (!order) {
            throw new Error("Order not found");
      }

      if (order.userId.toString() !== user.id) {
            throw new Error("Not authorized to view this order");
      }

      return normalizeOrder(order as unknown as OrderRecord);
}

export const resendOrderInvoice = async (orderId: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user?.email) {
            throw new Error("User not authenticated");
      }

      const order = await getOrderById(orderId);

      await sendOrderInvoiceEmail(order, user.email, user.name || order.shippingInfo.fullName);

      return { status: "success" };
}

export const getOrdersByUserId = async (userId: string) => {
      if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
      }

      const orders = await getCollection("ORDERS")
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

      return orders.map((order) => normalizeOrder(order as unknown as OrderRecord));
}
