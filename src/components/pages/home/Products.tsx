
import ProductCards, { type ProductCardProps } from "@/components/cards/ProductCards";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { getProducts } from "@/actions/server/product";

export type ToyProduct = ProductCardProps & {
      description?: string;
      bangla?: string;
};

const Products = async () => {
      const productList = await getProducts();
      

      return (
            <section className="space-y-8">
                  <div className="mx-auto max-w-2xl space-y-4 text-center">
                        <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                              Featured Products
                        </span>
                        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                              Our Products
                        </h2>
                        <p className="text-base-content/70 md:text-lg">
                              Explore our wide range of learning toys designed to make every play session meaningful.
                        </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {productList.map((product) => (
                              <ProductCards
                                    id={product._id}
                                    key={product.title}
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
            </section>
      );
};

export default Products;