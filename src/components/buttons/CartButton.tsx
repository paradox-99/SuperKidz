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
      const isValid = session.status === 'authenticated';
      const [loading, setLoading] = useState(false);


      const handleAddToCart = async () => {
            if (!isValid) {
                  router.push('/signin?callbackUrl=' + path);
            }

            setLoading(true);
            const discountedPrice = product.discount ? product.price - (product.price * (product.discount / 100)) : product.price;
            const result = await addToCart( product.id, 1, product.image, product.title, discountedPrice);
            setLoading(false);
            if (result.status === "success") {
                  toast.success("Item added to cart");
                  router.refresh();
            }
      };

      return (
            <button onClick={handleAddToCart} className="btn btn-primary btn-outline w-1/2" disabled={loading}>
                  Add to Cart
            </button>
      );
};

export default CartButton;