'use client';

import { addToCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BuyNowButton = ({ product }: {product: {id: string, title: string, image: string, price: number, discount?: number}}) => {

      const router = useRouter();
      const session = useSession();
      const path = usePathname();
      const [loading, setLoading] = useState(false);

      const handleBuyNow = async () => {
            if (session.status === 'unauthenticated') {
                  router.push('/signin?callbackUrl=' + path);
                  return;
            }

            setLoading(true);
            try {
                  const discountedPrice = product.discount ? product.price - (product.price * (product.discount / 100)) : product.price;
                  const result = await addToCart(product.id, 1, product.image, product.title, discountedPrice);
                  if (result.status === "success") {
                        router.push('/checkout');
                  }
            } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not process this item");
                  setLoading(false);
            }
      };

      return (
            <button onClick={handleBuyNow} className="btn btn-outline btn-lg" disabled={loading}>
                  {loading ? "Please wait..." : "Buy Now"}
            </button>
      );
};

export default BuyNowButton;
