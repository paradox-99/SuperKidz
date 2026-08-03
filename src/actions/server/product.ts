"use server";

import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
      const products = await getCollection("PRODUCTS").find().toArray();
      return products;
}

export const getProductById = async (id: string) => {
      if (!ObjectId.isValid(id)) {
            throw new Error("Invalid product ID");
      }
      const product = await getCollection("PRODUCTS").findOne({ _id: new ObjectId(id) });
      return product;
} 