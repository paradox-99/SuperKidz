"use server";

import { getCollection } from "@/lib/dbConfig";
import { requireAdmin } from "@/lib/adminAuth";
import { ObjectId } from "mongodb";

export const getAdminStats = async () => {
      await requireAdmin();

      const [
            productCount,
            userCount,
            reviewCount,
            orderCount,
            unpaidOrderCount,
            revenueResult,
            recentOrders,
      ] = await Promise.all([
            getCollection("PRODUCTS").countDocuments(),
            getCollection("USERS").countDocuments(),
            getCollection("REVIEWS").countDocuments(),
            getCollection("ORDERS").countDocuments(),
            getCollection("ORDERS").countDocuments({ paymentStatus: "unpaid" }),
            getCollection("ORDERS")
                  .aggregate([
                        { $match: { paymentStatus: "paid" } },
                        { $group: { _id: null, total: { $sum: "$total" } } },
                  ])
                  .toArray(),
            getCollection("ORDERS").find().sort({ createdAt: -1 }).limit(5).toArray(),
      ]);

      const userIds = [...new Set(recentOrders.map((order) => order.userId.toString()))];
      const users = userIds.length > 0
            ? await getCollection("USERS").find(
                  { _id: { $in: userIds.map((id) => new ObjectId(id)) } },
                  { projection: { name: 1 } }
            ).toArray()
            : [];
      const nameById = new Map(users.map((user) => [user._id.toString(), user.name as string]));

      return {
            productCount,
            userCount,
            reviewCount,
            orderCount,
            unpaidOrderCount,
            revenue: (revenueResult[0]?.total as number) ?? 0,
            recentOrders: recentOrders.map((order) => ({
                  _id: order._id.toString(),
                  customerName: nameById.get(order.userId.toString()) ?? "Unknown customer",
                  total: order.total as number,
                  status: order.status as string,
                  paymentStatus: (order.paymentStatus as string) ?? "unpaid",
                  createdAt: order.createdAt as Date,
            })),
      };
};
