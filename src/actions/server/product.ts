"use server";

import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import toys from "@/data/toys.json";
import { getReviewAggregates } from "@/actions/server/review";

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
            sold: product.sold,
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