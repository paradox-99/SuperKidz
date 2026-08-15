'use client';

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { clearCartByUserId } from "@/actions/server/cart";

const ClearCartButton = ({ userId }: { userId: string }) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();

      const handleClear = () => {
            startTransition(async () => {
                  try {
                        await clearCartByUserId(userId);
                        toast.success("Cart cleared");
                        router.refresh();
                  } catch (error) {
                        toast.error("Could not clear cart");
                  }
            });
      };

      return (
            <button
                  type="button"
                  onClick={handleClear}
                  disabled={pending}
                  className="btn btn-ghost btn-sm text-error"
            >
                  <FiTrash2 /> {pending ? "Clearing…" : "Clear cart"}
            </button>
      );
};

export default ClearCartButton;
