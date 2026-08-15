'use client';

import { addToCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CartButton = ({ product }: {product: {id: string, title: string, image: string, price: number, discount?: number}}) => {

      const router = useRouter();
      const session = useSession();
      const path = usePathname();
      const [loading, setLoading] = useState(false);


      const handleAddToCart = async () => {
            if (session.status === 'unauthenticated') {
                  router.push('/signin?callbackUrl=' + path);
                  return;
            }

            setLoading(true);
            try {
                  const discountedPrice = product.discount ? product.price - (product.price * (product.discount / 100)) : product.price;
                  const result = await addToCart(product.id, 1, product.image, product.title, discountedPrice);
                  if (result.status === "success") {
                        toast.success("Item added to cart");
                        router.refresh();
                  }
            } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not add item to cart");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <button onClick={handleAddToCart} className="btn btn-primary btn-outline w-1/2" disabled={loading}>
                  Add to Cart
            </button>
      );
};

export default CartButton;