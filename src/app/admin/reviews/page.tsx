import Link from "next/link";
import type { Metadata } from "next";
import { getAllReviewsForAdmin, adminDeleteReview } from "@/actions/server/review";
import StarRating from "@/components/reviews/StarRating";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const metadata: Metadata = {
      title: "Admin · Reviews",
};

type AdminReviewsPageProps = {
      searchParams: Promise<{ page?: string }>;
};

const AdminReviewsPage = async ({ searchParams }: AdminReviewsPageProps) => {
      const { page: pageParam } = await searchParams;
      const page = Math.max(1, Number(pageParam) || 1);
      const { reviews, total, pageSize } = await getAllReviewsForAdmin(page);
      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      return (
            <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <h2 className="mb-5 text-lg font-bold">Reviews ({total})</h2>

                  {reviews.length === 0 ? (
                        <p className="text-sm text-base-content/60">No reviews yet.</p>
                  ) : (
                        <div className="space-y-4">
                              {reviews.map((review) => (
                                    <div key={review._id} className="rounded-3xl border border-base-200 p-4">
                                          <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                      <p className="text-xs uppercase tracking-wide text-base-content/50">{review.productTitle}</p>
                                                      <div className="flex items-center gap-2">
                                                            <span className="font-semibold">{review.userName}</span>
                                                            {review.verifiedPurchase ? (
                                                                  <span className="badge badge-success badge-sm">Verified Purchase</span>
                                                            ) : null}
                                                      </div>
                                                      <StarRating value={review.rating} size="sm" />
                                                      <p className="mt-2 max-w-2xl text-sm text-base-content/80">{review.comment}</p>
                                                      <p className="mt-1 text-xs text-base-content/50">
                                                            {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                      </p>
                                                </div>
                                                <AdminDeleteButton
                                                      id={review._id}
                                                      action={adminDeleteReview}
                                                      confirmMessage="Delete this review?"
                                                />
                                          </div>
                                    </div>
                              ))}
                        </div>
                  )}

                  {totalPages > 1 ? (
                        <div className="mt-6 flex items-center justify-center gap-2">
                              <Link
                                    href={`/admin/reviews?page=${Math.max(1, page - 1)}`}
                                    className={`btn btn-sm ${page <= 1 ? "btn-disabled" : "btn-outline"}`}
                              >
                                    Previous
                              </Link>
                              <span className="px-3 text-sm text-base-content/60">
                                    Page {page} of {totalPages}
                              </span>
                              <Link
                                    href={`/admin/reviews?page=${Math.min(totalPages, page + 1)}`}
                                    className={`btn btn-sm ${page >= totalPages ? "btn-disabled" : "btn-outline"}`}
                              >
                                    Next
                              </Link>
                        </div>
                  ) : null}
            </div>
      );
};

export default AdminReviewsPage;
