import Image from "next/image";
import Link from "next/link";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import CartButton from "../buttons/CartButton";
import type { ProductCardProps } from "./ProductCards";

const FeaturedProductCard = ({ id, title, image, ratings, reviews, price, sold, discount }: ProductCardProps) => {
      const discountedPrice = discount ? Math.round(price - (price * discount) / 100) : price;

      return (
            <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-base-100 shadow-md ring-1 ring-base-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <Link href={`/products/${id}`} className="relative block aspect-16/11 overflow-hidden bg-base-200">
                        <Image
                              src={image}
                              alt={title}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              unoptimized
                              className="object-cover transition duration-500 group-hover:scale-110"
                        />

                        {discount ? (
                              <span className="absolute left-3 top-3 rounded-full bg-error px-3 py-1 text-xs font-bold text-error-content shadow">
                                    -{discount}%
                              </span>
                        ) : null}

                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-base-100/90 px-2.5 py-1 text-xs font-semibold text-base-content shadow">
                              <FiStar className="text-amber-500" />
                              {ratings.toFixed(1)}
                        </span>
                  </Link>

                  <div className="flex flex-col gap-1.5 p-3">
                        <Link href={`/products/${id}`}>
                              <h3 className="truncate text-sm font-bold leading-snug text-base-content transition hover:text-primary">
                                    {title}
                              </h3>
                        </Link>

                        <p className="text-xs text-base-content/50">
                              {reviews} reviews &middot; {sold} sold
                        </p>

                        <div className="flex items-center justify-between gap-2 pt-1">
                              <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-extrabold text-primary">৳{discountedPrice}</span>
                                    {discount ? (
                                          <span className="text-xs text-base-content/40 line-through">৳{price}</span>
                                    ) : null}
                              </div>

                              <CartButton
                                    product={{ id: id.toString(), title, image, price, discount }}
                                    className="btn btn-circle btn-primary btn-sm"
                              >
                                    <FiShoppingCart />
                              </CartButton>
                        </div>
                  </div>
            </article>
      );
};

export default FeaturedProductCard;
