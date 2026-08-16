"use server"

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

type ReviewRecord = {
      _id: ObjectId;
      productId: ObjectId;
      userId: ObjectId;
      userName: string;
      userImage?: string;
      rating: number;
      comment: string;
      orderId?: ObjectId;
      verifiedPurchase: boolean;
      seeded?: boolean;
      createdAt: Date;
      updatedAt: Date;
};

const normalizeReview = (review: ReviewRecord) => ({
      _id: review._id.toString(),
      productId: review.productId.toString(),
      userId: review.userId.toString(),
      userName: review.userName,
      userImage: review.userImage,
      rating: review.rating,
      comment: review.comment,
      verifiedPurchase: review.verifiedPurchase,
      createdAt: review.createdAt,
});

const revalidateProduct = (productId: string) => {
      revalidatePath("/");
      revalidatePath("/products");
      revalidatePath(`/products/${productId}`);
};

export const getProductReviews = async (productId: string) => {
      if (!ObjectId.isValid(productId)) {
            return [];
      }

      const reviews = await getCollection("REVIEWS")
            .find({ productId: new ObjectId(productId) })
            .sort({ createdAt: -1 })
            .toArray();

      return reviews.map((review) => normalizeReview(review as unknown as ReviewRecord));
};

export const getReviewEligibility = async (productId: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user || !ObjectId.isValid(user.id) || !ObjectId.isValid(productId)) {
            return { signedIn: false, hasPurchased: false, existingReview: null };
      }

      const order = await getCollection("ORDERS").findOne({
            userId: new ObjectId(user.id),
            "items.productId": new ObjectId(productId),
      });

      const existing = await getCollection("REVIEWS").findOne({
            productId: new ObjectId(productId),
            userId: new ObjectId(user.id),
      });

      return {
            signedIn: true,
            hasPurchased: Boolean(order),
            existingReview: existing ? normalizeReview(existing as unknown as ReviewRecord) : null,
      };
};

export const submitReview = async (productId: string, rating: number, comment: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user) {
            throw new Error("User not authenticated");
      }

      if (!ObjectId.isValid(user.id) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid user ID or product ID");
      }

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
      }

      if (!comment.trim()) {
            throw new Error("Review comment is required");
      }

      const order = await getCollection("ORDERS").findOne({
            userId: new ObjectId(user.id),
            "items.productId": new ObjectId(productId),
      });

      if (!order) {
            throw new Error("Only customers who purchased this product can leave a review");
      }

      try {
            await getCollection("REVIEWS").insertOne({
                  productId: new ObjectId(productId),
                  userId: new ObjectId(user.id),
                  userName: user.name || "SuperKidz customer",
                  userImage: user.image ?? undefined,
                  rating,
                  comment: comment.trim(),
                  orderId: order._id,
                  verifiedPurchase: true,
                  createdAt: new Date(),
                  updatedAt: new Date(),
            });
      } catch (error: any) {
            if (error?.code === 11000) {
                  throw new Error("You have already reviewed this product");
            }
            console.error("Error submitting review:", error);
            throw new Error("Failed to submit review");
      }

      revalidateProduct(productId);

      return { status: "success" };
};

export const updateReview = async (reviewId: string, rating: number, comment: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user || !ObjectId.isValid(user.id) || !ObjectId.isValid(reviewId)) {
            throw new Error("User not authenticated");
      }

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
      }

      if (!comment.trim()) {
            throw new Error("Review comment is required");
      }

      const review = await getCollection("REVIEWS").findOne({ _id: new ObjectId(reviewId) });

      if (!review) {
            throw new Error("Review not found");
      }

      if (review.userId.toString() !== user.id) {
            throw new Error("Not authorized to edit this review");
      }

      await getCollection("REVIEWS").updateOne(
            { _id: new ObjectId(reviewId) },
            { $set: { rating, comment: comment.trim(), updatedAt: new Date() } }
      );

      revalidateProduct(review.productId.toString());

      return { status: "success" };
};

export const deleteReview = async (reviewId: string) => {
      const { user } = await getServerSession(authOptions) ?? {};

      if (!user || !ObjectId.isValid(user.id) || !ObjectId.isValid(reviewId)) {
            throw new Error("User not authenticated");
      }

      const review = await getCollection("REVIEWS").findOne({ _id: new ObjectId(reviewId) });

      if (!review) {
            throw new Error("Review not found");
      }

      if (review.userId.toString() !== user.id) {
            throw new Error("Not authorized to delete this review");
      }

      await getCollection("REVIEWS").deleteOne({ _id: new ObjectId(reviewId) });

      revalidateProduct(review.productId.toString());

      return { status: "success" };
};

export const getReviewAggregates = async (productIds: string[]) => {
      const validIds = productIds.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));

      if (validIds.length === 0) {
            return new Map<string, { averageRating: number; reviewCount: number }>();
      }

      const results = await getCollection("REVIEWS")
            .aggregate([
                  { $match: { productId: { $in: validIds } } },
                  { $group: { _id: "$productId", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
            ])
            .toArray();

      return new Map(
            results.map((result) => [
                  String(result._id),
                  { averageRating: result.averageRating as number, reviewCount: result.reviewCount as number },
            ])
      );
};
