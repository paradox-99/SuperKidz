'use client';

import { useRouter } from "next/navigation";

const CartButton = ({ product }) => {

      const router = useRouter();

      const isValid = false; // Replace with actual validation logic

      const handleAddToCart = () => {
            if (!isValid) {
                  router.push('/signup');
            }
      };

      return (
            <button onClick={handleAddToCart} className="btn btn-primary btn-outline w-1/2">
                  Add to Cart
            </button>
      );
};

export default CartButton;