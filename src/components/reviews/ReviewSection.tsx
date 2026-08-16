import { FiCheckCircle } from "react-icons/fi";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

type Review = {
      _id: string;
      userName: string;
      userImage?: string;
      rating: number;
      comment: string;
      verifiedPurchase: boolean;
      createdAt: Date;
};

type Eligibility = {
      signedIn: boolean;
      hasPurchased: boolean;
      existingReview: { _id: string; rating: number; comment: string } | null;
};

type ReviewSectionProps = {
      productId: string;
      ratings: number;
      reviewCount: number;
      reviews: Review[];
      eligibility: Eligibility;
};

const ReviewSection = ({ productId, ratings, reviewCount, reviews, eligibility }: ReviewSectionProps) => {
      return (
            <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-2xl font-black">Customer reviews</h2>
                        <div className="flex items-center gap-2">
                              <StarRating value={ratings} />
                              <span className="text-sm text-base-content/70">
                                    {ratings.toFixed(1)} · {reviewCount} review{reviewCount === 1 ? "" : "s"}
                              </span>
                        </div>
                  </div>

                  <div className="mb-6">
                        <ReviewForm productId={productId} eligibility={eligibility} />
                  </div>

                  {reviews.length === 0 ? (
                        <p className="text-sm text-base-content/60">No reviews yet. Be the first to share your experience.</p>
                  ) : (
                        <div className="space-y-4">
                              {reviews.map((review) => (
                                    <div key={review._id} className="rounded-2xl bg-base-200/70 p-5">
                                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                      <span className="font-semibold">{review.userName}</span>
                                                      {review.verifiedPurchase ? (
                                                            <span className="badge badge-success badge-outline gap-1 text-xs">
                                                                  <FiCheckCircle /> Verified Purchase
                                                            </span>
                                                      ) : null}
                                                </div>
                                                <span className="text-xs text-base-content/50">
                                                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                      })}
                                                </span>
                                          </div>
                                          <StarRating value={review.rating} size="sm" />
                                          <p className="mt-2 leading-6 text-base-content/80">{review.comment}</p>
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
};

export default ReviewSection;
