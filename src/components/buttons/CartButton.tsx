'use client';

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const CartButton = ({ product }: {product: any}) => {

      const router = useRouter();
      const session = useSession();
      const path = usePathname();
      const isValid = session.status === 'authenticated';


      const handleAddToCart = () => {
            if (!isValid) {
                  router.push('/signin?callbackUrl=' + path);
            }
      };

      return (
            <button onClick={handleAddToCart} className="btn btn-primary btn-outline w-1/2">
                  Add to Cart
            </button>
      );
};

export default CartButton;