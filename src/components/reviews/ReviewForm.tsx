'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { deleteReview, submitReview, updateReview } from "@/actions/server/review";
import StarRating from "./StarRating";

type Eligibility = {
      signedIn: boolean;
      hasPurchased: boolean;
      existingReview: { _id: string; rating: number; comment: string } | null;
};

const ReviewForm = ({ productId, eligibility }: { productId: string; eligibility: Eligibility }) => {
      const router = useRouter();
      const pathname = usePathname();
      const [pending, startTransition] = useTransition();
      const [rating, setRating] = useState(eligibility.existingReview?.rating ?? 0);
      const [comment, setComment] = useState(eligibility.existingReview?.comment ?? "");

      if (!eligibility.signedIn) {
            return (
                  <div className="rounded-3xl bg-base-200/70 p-5 text-sm">
                        <Link href={`/signin?callbackUrl=${pathname}`} className="link link-primary font-semibold">
                              Sign in
                        </Link>
                        {" "}to write a review.
                  </div>
            );
      }

      if (!eligibility.hasPurchased) {
            return (
                  <div className="rounded-3xl bg-base-200/70 p-5 text-sm text-base-content/70">
                        Only customers who purchased this product can leave a review.
                  </div>
            );
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (rating < 1) {
                  toast.error("Please select a rating");
                  return;
            }

            startTransition(async () => {
                  try {
                        if (eligibility.existingReview) {
                              await updateReview(eligibility.existingReview._id, rating, comment);
                              toast.success("Review updated");
                        } else {
                              await submitReview(productId, rating, comment);
                              toast.success("Review submitted");
                        }
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not save review");
                  }
            });
      };

      const handleDelete = () => {
            if (!eligibility.existingReview) return;

            startTransition(async () => {
                  try {
                        await deleteReview(eligibility.existingReview!._id);
                        toast.success("Review deleted");
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not delete review");
                  }
            });
      };

      return (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-base-200/70 p-5">
                  <div className="space-y-2">
                        <p className="text-sm font-semibold">Your rating</p>
                        <StarRating value={rating} size="lg" interactive onChange={setRating} />
                  </div>

                  <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this product…"
                        className="textarea textarea-bordered w-full"
                        rows={3}
                  />

                  <div className="flex flex-wrap gap-3">
                        <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
                              {pending ? "Saving…" : eligibility.existingReview ? "Update review" : "Submit review"}
                        </button>
                        {eligibility.existingReview ? (
                              <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="btn btn-outline btn-error btn-sm"
                                    disabled={pending}
                              >
                                    Delete
                              </button>
                        ) : null}
                  </div>
            </form>
      );
};

export default ReviewForm;
