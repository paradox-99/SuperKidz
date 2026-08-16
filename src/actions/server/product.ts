"use server";

import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import toys from "@/data/toys.json";
import { getReviewAggregates, revalidateProduct } from "@/actions/server/review";
import { requireAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

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

type ReviewAggregate = { averageRating: number; reviewCount: number };

const normalizeProduct = (product: any, id: string, aggregate?: ReviewAggregate): ProductRecord => {
      const hasReviews = Boolean(aggregate && aggregate.reviewCount > 0);

      return {
            _id: id,
            title: product.title,
            image: product.image,
            ratings: hasReviews ? Math.min(5, Math.max(0, aggregate!.averageRating)) : Number(product.ratings) || 0,
            reviews: hasReviews ? aggregate!.reviewCount : Number(product.reviews) || 0,
            price: product.price,
            sold: Number(product.sold) || 0,
            description: product.description,
            bangla: product.bangla,
            info: product.info,
            qna: product.qna,
            discount: product.discount,
      };
};

// Isolated from the product fetch: a REVIEWS hiccup must not push
// getProducts()/getProductById() into the toys.json fallback path.
const safeGetReviewAggregates = async (productIds: string[]) => {
      try {
            return await getReviewAggregates(productIds);
      } catch (error) {
            console.error("Error fetching review aggregates:", error);
            return new Map<string, ReviewAggregate>();
      }
};

export const getProducts = async (): Promise<ProductRecord[]> => {
      try {
            const products = await getCollection("PRODUCTS").find().toArray();
            const ids = products.map((product) => product._id.toString());
            const aggregates = await safeGetReviewAggregates(ids);
            return products.map((product) => {
                  const id = product._id.toString();
                  return normalizeProduct(product, id, aggregates.get(id));
            });
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
            if (!product) return null;
            const aggregates = await safeGetReviewAggregates([id]);
            return normalizeProduct(product, product._id.toString(), aggregates.get(id));
      } catch {
            const localProducts = toys.map((product, index) => normalizeProduct(product, `local-${index + 1}`));
            return localProducts.find((product) => product._id === id) ?? null;
      }
}

export type ProductInput = {
      title: string;
      image: string;
      price: number;
      bangla?: string;
      description?: string;
      discount?: number;
      sold?: number;
      info?: string[];
      qna?: { question: string; answer: string }[];
};

const buildProductDoc = (input: ProductInput) => {
      if (!input.title?.trim()) {
            throw new Error("Title is required");
      }
      if (!input.image?.trim()) {
            throw new Error("Image URL is required");
      }
      if (!Number.isFinite(input.price) || input.price <= 0) {
            throw new Error("Price must be a positive number");
      }
      if (input.discount !== undefined && (!Number.isFinite(input.discount) || input.discount < 0 || input.discount > 100)) {
            throw new Error("Discount must be between 0 and 100");
      }
      if (input.sold !== undefined && (!Number.isFinite(input.sold) || input.sold < 0)) {
            throw new Error("Sold must be a non-negative number");
      }

      return {
            title: input.title.trim(),
            image: input.image.trim(),
            price: input.price,
            bangla: input.bangla?.trim() || undefined,
            description: input.description?.trim() || undefined,
            discount: input.discount || undefined,
            sold: input.sold ?? 0,
            info: (input.info ?? []).map((item) => item.trim()).filter(Boolean),
            qna: (input.qna ?? []).filter((item) => item.question.trim() && item.answer.trim()).map((item) => ({
                  question: item.question.trim(),
                  answer: item.answer.trim(),
            })),
      };
};

export const createProduct = async (input: ProductInput) => {
      await requireAdmin();

      const product = buildProductDoc(input);

      const result = await getCollection("PRODUCTS").insertOne({
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
      });

      await revalidateProduct(result.insertedId.toString());
      revalidatePath("/admin/products");

      return { status: "success", productId: result.insertedId.toString() };
};

export const updateProduct = async (id: string, input: ProductInput) => {
      await requireAdmin();

      if (!ObjectId.isValid(id)) {
            throw new Error("Invalid product ID");
      }

      const product = buildProductDoc(input);

      const result = await getCollection("PRODUCTS").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...product, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
            throw new Error("Product not found");
      }

      await revalidateProduct(id);
      revalidatePath("/admin/products");

      return { status: "success" };
};

export const deleteProduct = async (id: string) => {
      await requireAdmin();

      if (!ObjectId.isValid(id)) {
            throw new Error("Invalid product ID");
      }

      const result = await getCollection("PRODUCTS").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
            throw new Error("Product not found");
      }

      await getCollection("CART").deleteMany({ productId: new ObjectId(id) });
      await getCollection("REVIEWS").deleteMany({ productId: new ObjectId(id) });

      await revalidateProduct(id);
      revalidatePath("/admin/products");

      return { status: "success" };
};

export const getAllProductsForAdmin = async (): Promise<ProductRecord[]> => {
      await requireAdmin();

      const products = await getCollection("PRODUCTS").find().sort({ createdAt: -1 }).toArray();

      return products.map((product) => normalizeProduct(product, product._id.toString()));
};
