"use server";

import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import toys from "@/data/toys.json";

type ProductRecord = {
      _id: string;
      title: string;
      image: string;
      ratings: number;
      reviews: number;
      price: number;
      sold: number;
      description?: string;
      bangla?: string;
      info?: string[];
      qna?: { question: string; answer: string }[];
      discount?: number;
};

const normalizeProduct = (product: any, id: string): ProductRecord => ({
      _id: id,
      title: product.title,
      image: product.image,
      ratings: product.ratings,
      reviews: product.reviews,
      price: product.price,
      sold: product.sold,
      description: product.description,
      bangla: product.bangla,
      info: product.info,
      qna: product.qna,
      discount: product.discount,
});

export const getProducts = async (): Promise<ProductRecord[]> => {
      try {
            const products = await getCollection("PRODUCTS").find().toArray();
            return products.map((product) => normalizeProduct(product, product._id.toString()));
      } catch {
            return toys.map((product, index) => normalizeProduct(product, `local-${index + 1}`));
      }
}

export const getProductById = async (id: string): Promise<ProductRecord | null> => {
      if (!ObjectId.isValid(id)) {
            const localProducts = toys.map((product, index) => normalizeProduct(product, `local-${index + 1}`));
            return localProducts.find((product) => product._id === id) ?? null;
      }
      try {
            const product = await getCollection("PRODUCTS").findOne({ _id: new ObjectId(id) });
            return product ? normalizeProduct(product, product._id.toString()) : null;
      } catch {
            const localProducts = toys.map((product, index) => normalizeProduct(product, `local-${index + 1}`));
            return localProducts.find((product) => product._id === id) ?? null;
      }
} 