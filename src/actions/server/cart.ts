"use server";

import { authOptions } from "@/lib/authOptions";
import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const normalizeCartItem = (item: any, id: string) => ({
      _id: id,
      userId: item.userId,
      productId: item.productId,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
});

export const getCartItemsByUserId = async (userId: string) => {
      if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
      }
      try {
            const cartItems = await getCollection("CART").find({ userId: new ObjectId(userId) }).toArray();
            return cartItems.map((item) => normalizeCartItem(item, item._id.toString()));
      } catch (error) {
            console.error("Error fetching cart items:", error);
            throw new Error("Failed to fetch cart items");
      }
}

export const addToCart = async (productId: string, quantity: number, image: string, name: string, price: number) => {

      const session = await getServerSession(authOptions);
      const user = session?.user;

      if (!user) {
            throw new Error("User not authenticated");
      }

      if (!ObjectId.isValid(user.id) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid user ID or product ID");
      }
      try {
            const existingItem = await getCollection("CART").findOne({ userId: new ObjectId(user.id), productId: new ObjectId(productId) });
            if (existingItem) {
                  // Update the quantity of the existing item
                  const result = await getCollection("CART").updateOne(
                        { _id: existingItem._id },
                        { $inc: { quantity } }
                  );
                  return { status: "success", updatedId: result.upsertedId?.toString() || existingItem._id.toString() };
            } else {
                  // Insert a new cart item
                  const result = await getCollection("CART").insertOne({
                        productId: new ObjectId(productId),
                        userId: new ObjectId(user.id),
                        image,
                        name,
                        price,
                        quantity,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                  });
                  return { status: "success", insertedId: result.insertedId.toString() };
            }
      } catch (error) {
            console.error("Error adding to cart:", error);
            throw new Error("Failed to add to cart");
      }
}

export const updateCartItemQuantity = async (cartItemId: string, newQuantity: number) => {
      if (!ObjectId.isValid(cartItemId)) {
            throw new Error("Invalid cart item ID");
      }
      try {
            const result = await getCollection("CART").updateOne(
                  { _id: new ObjectId(cartItemId) },
                  { $set: { quantity: newQuantity, updatedAt: new Date() } }
            );
            if (result.modifiedCount === 0) {
                  throw new Error("Cart item not found or quantity unchanged");
            }
            return { status: "success", updatedId: cartItemId };
      } catch (error) {
            console.error("Error updating cart item quantity:", error);
            throw new Error("Failed to update cart item quantity");
      }
}

export const removeCartItem = async (cartItemId: string) => {
      if (!ObjectId.isValid(cartItemId)) {
            throw new Error("Invalid cart item ID");
      }
      try {
            const result = await getCollection("CART").deleteOne({ _id: new ObjectId(cartItemId) });
            if (result.deletedCount === 0) {
                  throw new Error("Cart item not found");
            }
            return { status: "success", removedId: cartItemId };
      } catch (error) {
            console.error("Error removing cart item:", error);
            throw new Error("Failed to remove cart item");
      }
}

export const clearCartByUserId = async (userId: string) => {
      if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
      }
      try {
            const result = await getCollection("CART").deleteMany({ userId: new ObjectId(userId) });
            return { status: "success", deletedCount: result.deletedCount };
      } catch (error) {
            console.error("Error clearing cart:", error);
            throw new Error("Failed to clear cart");
      }
}

export const getCartItemCountByUserId = async (userId: string) => {
      if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
      }
      try {
            const count = await getCollection("CART").countDocuments({ userId: new ObjectId(userId) });
            return count;
      } catch (error) {
            console.error("Error counting cart items:", error);
            throw new Error("Failed to count cart items");
      }
}