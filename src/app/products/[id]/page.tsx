import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import {
      FiArrowLeft,
      FiCheckCircle,
      FiMessageSquare,
      FiPackage,
      FiStar,
} from "react-icons/fi";
import { getProductById } from "@/actions/server/product";
import { getProductReviews, getReviewEligibility } from "@/actions/server/review";
import BuyNowButton from "@/components/buttons/BuyNowButton";
import CartButton from "@/components/buttons/CartButton";
import ReviewSection from "@/components/reviews/ReviewSection";

type ProductDetailsProps = {
      params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
      const { id } = await params;
      const product = await getProductById(id);

      if (!product) {
            return {
                  title: "Product not found",
                  description: "The requested product could not be found.",
            };
      }

      const title = `${product.title} | SuperKidz`;
      const description = product.description
            ? product.description.replace(/\s+/g, " ").trim().slice(0, 160)
            : `Explore ${product.title} at SuperKidz.`;

      return {
            title,
            description,
            keywords: [
                  product.title,
                  product.bangla,
                  "SuperKidz",
                  "educational toy",
                  "kids toy",
                  "learning toy",
            ].filter((keyword): keyword is string => Boolean(keyword)),
            alternates: {
                  canonical: `/products/${id}`,
            },
            openGraph: {
                  title,
                  description,
                  type: "website",
                  url: `/products/${id}`,
                  images: product.image
                        ? [{ url: product.image, alt: product.title, width: 1200, height: 630 }]
                        : undefined,
            },
            twitter: {
                  card: "summary_large_image",
                  title,
                  description,
                  images: product.image ? [product.image] : undefined,
            },
      };
}

const page = async ({ params }: ProductDetailsProps) => {
      const { id } = await params;

      const product = await getProductById(id);

      if (!product) {
            notFound();
      }

      const infoList = Array.isArray(product.info) ? product.info : [];
      const qnaList = Array.isArray(product.qna) ? product.qna : [];
      const reviewsAvailable = ObjectId.isValid(id);

      const [reviews, eligibility] = reviewsAvailable
            ? await Promise.all([getProductReviews(id), getReviewEligibility(id)])
            : [[], { signedIn: false, hasPurchased: false, existingReview: null }];

      return (
            <section className="space-y-10 py-6 md:py-10">
                  <div className="flex flex-wrap items-center gap-3">
                        <Link href="/products" className="btn btn-ghost btn-sm">
                              <FiArrowLeft /> Back to products
                        </Link>
                        <span className="badge badge-outline badge-primary px-4 py-3 font-semibold">
                              Product details
                        </span>
                  </div>

                  {/* Hero: image + buy box, kept to matching heights */}
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                        <div className="lg:sticky lg:top-24">
                              <div className="card overflow-hidden border border-base-200 bg-base-100 shadow-lg">
                                    <figure className="relative aspect-square bg-linear-to-br from-amber-50 via-orange-50 to-rose-100">
                                          <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                unoptimized
                                                className="object-cover"
                                          />
                                          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                                                <span className="badge badge-primary badge-lg border-0 text-white shadow-md">
                                                      Educational Toy
                                                </span>
                                                {product.discount ? (
                                                      <span className="badge badge-error badge-lg border-0 text-white shadow-md">
                                                            {product.discount}% off
                                                      </span>
                                                ) : null}
                                          </div>
                                    </figure>
                              </div>
                        </div>

                        <div className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                              <div className="space-y-2">
                                    <h1 className="text-3xl font-black leading-tight md:text-4xl">
                                          {product.title}
                                    </h1>
                                    {product.bangla ? (
                                          <p className="text-lg font-semibold text-base-content/70">
                                                {product.bangla}
                                          </p>
                                    ) : null}
                              </div>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-base-content/70">
                                    <span className="inline-flex items-center gap-1.5 font-semibold text-base-content">
                                          <FiStar className="text-amber-500" /> {product.ratings.toFixed(1)} rating
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-base-content/30" />
                                    <span className="inline-flex items-center gap-1.5">
                                          <FiMessageSquare className="text-primary" /> {product.reviews} reviews
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-base-content/30" />
                                    <span className="inline-flex items-center gap-1.5">
                                          <FiPackage className="text-secondary" /> {product.sold} sold
                                    </span>
                              </div>

                              <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl bg-base-200 px-5 py-4">
                                    <div>
                                          <p className="text-xs uppercase tracking-[0.25em] text-base-content/50">
                                                Price
                                          </p>
                                          <span className="text-4xl font-black text-primary">
                                                ৳{product.price}
                                          </span>
                                    </div>
                                    {product.discount ? (
                                          <span className="badge badge-error border-0 px-3 py-3 text-sm font-semibold text-white">
                                                Save {product.discount}%
                                          </span>
                                    ) : null}
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2">
                                    <CartButton product={{id: id.toString(), title: product.title, image: product.image, price: product.price, discount: product.discount}} />
                                    <BuyNowButton product={{id: id.toString(), title: product.title, image: product.image, price: product.price, discount: product.discount}} />
                              </div>

                              {product.description ? (
                                    <div className="space-y-2 border-t border-base-200 pt-5">
                                          <h2 className="text-lg font-bold">Description</h2>
                                          <p className="whitespace-pre-line leading-7 text-base-content/80">
                                                {product.description}
                                          </p>
                                    </div>
                              ) : null}
                        </div>
                  </div>

                  {/* Key features run full-width so they aren't squeezed into a narrow column */}
                  {infoList.length > 0 ? (
                        <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                              <h2 className="mb-4 text-2xl font-black">Key features</h2>
                              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {infoList.map((item: string) => (
                                          <li
                                                key={item}
                                                className="flex items-start gap-3 rounded-2xl bg-base-200/70 p-4"
                                          >
                                                <FiCheckCircle className="mt-1 shrink-0 text-primary" />
                                                <span className="leading-6">{item}</span>
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  ) : null}

                  {/* Q&A collapses by default so the page stays compact */}
                  {qnaList.length > 0 ? (
                        <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                              <h2 className="mb-4 text-2xl font-black">Questions & answers</h2>
                              <div className="space-y-3">
                                    {qnaList.map((item: { question: string; answer: string }, index: number) => (
                                          <details
                                                key={`${item.question}-${index}`}
                                                className="collapse collapse-arrow rounded-2xl bg-base-200/70"
                                                open={index === 0}
                                          >
                                                <summary className="collapse-title text-base font-bold">
                                                      {item.question}
                                                </summary>
                                                <div className="collapse-content">
                                                      <p className="leading-7 text-base-content/80">{item.answer}</p>
                                                </div>
                                          </details>
                                    ))}
                              </div>
                        </div>
                  ) : null}

                  {reviewsAvailable ? (
                        <ReviewSection
                              productId={id}
                              ratings={product.ratings}
                              reviewCount={product.reviews}
                              reviews={reviews}
                              eligibility={eligibility}
                        />
                  ) : (
                        <div className="rounded-4xl border border-base-200 bg-base-100 p-6 text-sm text-base-content/60 shadow-lg md:p-8">
                              Reviews are not available for this product yet.
                        </div>
                  )}
            </section>
      );
};

export default page;
