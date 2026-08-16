import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import FeaturedProductCard from "@/components/cards/FeaturedProductCard";
import { getFeaturedProducts } from "@/actions/server/product";

const FeaturedProducts = async () => {
      const productList = await getFeaturedProducts(8);

      return (
            <section className="w-full space-y-8">
                  <div className="mx-auto max-w-2xl space-y-4 text-center">
                        <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                              Featured Products
                        </span>
                        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                              Our Bestsellers
                        </h2>
                        <p className="text-base-content/70 md:text-lg">
                              A hand-picked selection of our most-loved learning toys.
                        </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                        {productList.map((product) => (
                              <FeaturedProductCard
                                    id={product._id}
                                    key={product._id}
                                    title={product.title}
                                    image={product.image}
                                    ratings={product.ratings}
                                    reviews={product.reviews}
                                    price={product.price}
                                    sold={product.sold}
                                    discount={product.discount}
                              />
                        ))}
                  </div>

                  <div className="text-center">
                        <Link href="/products" className="btn btn-outline btn-primary gap-2">
                              View All Products
                              <FiArrowRight />
                        </Link>
                  </div>
            </section>
      );
};

export default FeaturedProducts;
