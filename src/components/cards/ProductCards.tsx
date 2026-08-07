import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiShoppingBag } from "react-icons/fi";
import CartButton from "../buttons/CartButton";

export interface ProductCardProps {
      id: ObjectId;
      title: string;
      image: string;
      ratings: number;
      reviews: number;
      price: number;
      sold: number;
}

const ProductCards = ({id, title, image, ratings, reviews, price, sold }: ProductCardProps) => {

      return (
            <article className="card group overflow-hidden border border-base-200 bg-base-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <figure className="relative h-60 overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-rose-100">
                        <Image
                              src={image}
                              alt={title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                              <span className="badge badge-primary badge-lg border-0 text-white shadow-md">
                                    Educational Toy
                              </span>
                              <span className="badge badge-neutral badge-lg border-0 text-neutral-content shadow-md">
                                    <FiStar className="mr-1" /> {ratings.toFixed(1)}
                              </span>
                        </div>
                  </figure>

                  <div className="card-body gap-4 p-5">
                        <div className="space-y-2">
                              <h3 className="text-xl font-bold leading-snug text-base-content">
                                    {title}
                              </h3>

                              <div className="flex items-center gap-2 text-sm text-base-content/70">
                                    <span className="inline-flex items-center gap-1">
                                          <FiStar className="text-amber-500" />
                                          {ratings.toFixed(1)} rating
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-base-content/30" />
                                    <span>{reviews} reviews</span>
                              </div>
                        </div>

                        <div className="flex items-end justify-between gap-4 border-t border-base-200 pt-4">
                              <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-base-content/50">
                                          Price
                                    </p>
                                    <p className="text-2xl font-extrabold text-primary">৳{price}</p>
                              </div>

                              <div className="rounded-2xl bg-base-200 px-4 py-3 text-right">
                                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                          <FiShoppingBag />
                                          Sold
                                    </p>
                                    <p className="text-lg font-bold text-base-content">{sold} pcs</p>
                              </div>
                        </div>
                        <div className="flex flex-col gap-3 pt-4 md:flex-row md:justify-between w-full">
                              <CartButton product={{id: id.toString(), title, image, ratings, reviews, price, sold}} />
                              <Link href={`/products/${id}`} className="btn btn-info btn-outline w-1/2">
                                    Details
                              </Link>
                        </div>
                  </div>
            </article>
      );
};

export default ProductCards;